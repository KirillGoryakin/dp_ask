import QRCode from 'qrcode';

export function generateQrCode(
  text: string,
  options?: QRCode.QRCodeToDataURLOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      text,
      { errorCorrectionLevel: 'L', margin: 2, ...options },
      function (err, url) {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      },
    );
  });
}
