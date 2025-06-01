import TrezorConnect from '@trezor/connect-web';

export const MULTISIG_ROOT = "m/48'";
export const MAIN_BIP32_PATH = "m/48'/0'/0'/1'";

const HARDENING_OFFSET = Math.pow(2, 31);

const bip32PathToSequence = (pathString: string) => {
  const pathSegments = pathString.split('/').splice(1);
  return pathSegments.map((pathSegment) => {
    if (pathSegment.substr(-1) === "'") {
      return parseInt(pathSegment.slice(0, -1), 10) + HARDENING_OFFSET;
    } else {
      return parseInt(pathSegment, 10);
    }
  });
};

const connectedDeviceState = {
  id: null,
  name: '',
};

type ExportPublicKeyErrorResponseType = {
  success: false;
  error: string;
  data: null;
};

type ExportPublicKeySuccessResponseType = {
  success: true;
  data: {
    key: {
      path: string;
      xpub: string;
      xfp: string;
    };
    device: any;
  };
  error: null;
};

const TrezorInteraction = {
  initTrezor: async () => {
    try {
      await TrezorConnect.init({
        lazyLoad: false,
        manifest: {
          email: 'info@asylia.io',
          appUrl: 'https://asylia.io',
        },
        debug: true,
      });
      return true;
    } catch (e) {
      console.error('TrezorConnect init error:', e);
      return false;
    }
  },

  destroyTrezor: () => {
    try {
      TrezorConnect.dispose();
    } catch (e) {
      console.error('TrezorConnect dispose error:', e);
    }

    connectedDeviceState.id = null;
    connectedDeviceState.name = '';
  },

  exportPublicKey: async (
    bip32Path = MAIN_BIP32_PATH,
  ): Promise<ExportPublicKeyErrorResponseType | ExportPublicKeySuccessResponseType> => {
    TrezorInteraction.destroyTrezor();
    const initSuccess = await TrezorInteraction.initTrezor();

    const catchError = (error: string): ExportPublicKeyErrorResponseType => ({
      error,
      data: null,
      success: false,
    });

    if (!initSuccess) return catchError('TrezorConnect init failed');

    try {
      const result = await TrezorConnect.getPublicKey({
        coin: 'Bitcoin',
        bundle: [
          {
            path: bip32Path,
            showOnTrezor: false,
          },
          {
            path: MULTISIG_ROOT,
            showOnTrezor: true,
          },
        ],
        crossChain: true,
      });

      console.log('TrezorConnect.getPublicKey result:', result);

      if (!result.success) return catchError(result.payload.error);

      if (!result.payload[0] || !result.payload[1])
        return catchError('Payload does not have two responses.');

      const key = {
        path: result.payload[0].serializedPath,
        xpub: result.payload[0].xpub,
        xfp: result.payload[1]?.fingerprint.toString(16),
      };

      return {
        success: true,
        data: {
          key,
          device: {
            DeviceFullName: connectedDeviceState.name,
            DeviceMeta: {},
            DeviceHwId: connectedDeviceState.id,
          },
        },
        error: null,
      };
    } catch (e) {
      return catchError(e as string);
    } finally {
      TrezorInteraction.destroyTrezor();
    }
  },

  signPSBTTransaction: ({ psbt, derivedPublicKeys, m }) =>
    new Promise(async (resolve) => {
      await TrezorInteraction.initTrezor();

      const txInputs = psbt.txInputs;
      const dataInputs = psbt.data.inputs;
      const txOutputs = psbt.txOutputs;

      const mapInputSignatureForInput = (input) => {
        if (!input?.partialSig) return Array(derivedPublicKeys.publicKeys.length).fill('');
        const signatures = [];
        for (const singlePublicKey of derivedPublicKeys.publicKeys) {
          let signature = '';
          for (const singlePartSing of input.partialSig) {
            if (singlePublicKey.derivedPubKeyHex === singlePartSing.pubkey.toString('hex')) {
              signature = singlePartSing.signature.toString('hex');
            }
          }
          signatures.push(signature);
        }
        return signatures;
      };

      const mappedInputs = txInputs.map((input, i) => {
        const data = {
          address_n: bip32PathToSequence(dataInputs[i].bip32Derivation[0].path),
          prev_hash: input.hash.reverse().toString('hex'),
          prev_index: input.index,
          script_type: 'SPENDP2SHWITNESS',
          amount: dataInputs[i].witnessUtxo.value,
          sequence: input.sequence,
          multisig: {
            m,
            pubkeys: dataInputs[i].bip32Derivation.map((key) => ({
              address_n: [],
              node: {
                // todo fix me ??
                depth: 0,
                child_num: 0,
                fingerprint: 0,
                chain_code: '0'.repeat(64),
                public_key: key.pubkey.toString('hex'),
              },
            })),
            signatures: mapInputSignatureForInput(dataInputs[i]),
          },
        };
        return data;
      });

      const mappedOutputs = txOutputs.map((out, i) => ({
        address: out.address,
        amount: out.value,
        script_type: 'PAYTOADDRESS',
      }));

      const transactionToSign = {
        coin: 'Bitcoin',
        inputs: mappedInputs,
        outputs: mappedOutputs,
        version: 2,
      };

      try {
        const result = await TrezorConnect.signTransaction(transactionToSign);

        if (!result.success) {
          // todo
          resolve({
            data: null,
            error: 'err 1',
          });
        }

        // mark as sig all
        result.payload.signatures = result.payload.signatures.map((sig) => `${sig}01`);

        return resolve({
          data: {
            serializedTx: result.payload.serializedTx,
            signatures: result.payload.signatures,
            witnesses: result.payload.witnesses,
          },
          error: null,
        });
      } catch (e) {
        resolve({
          data: null,
          error: 'err 2',
        });
      } finally {
        await TrezorInteraction.destroyTrezor();
      }
    }),
};

export default TrezorInteraction;
