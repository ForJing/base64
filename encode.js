var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 *
 * @param {String} str
 */
function myBase64Encode(str) {
  // 不足3的倍数字节要补

  let bStr = getBinaryString(str);
  const insertCount = bStr.length / 6;

  for (let i = 0; i < insertCount; i++) {
    let insertPos = 8 * i;
    bStr = [bStr.slice(0, insertPos) + "00" + bStr.slice(insertPos)].join("");
  }

  let equalsToAdd = 0;
  const remain = bStr.length % 8;
  if (remain > 0) {
    bStr += "0".repeat(8 - remain);
    equalsToAdd = (8 - remain) / 2;
    console.log({ equalsToAdd });
  }

  let base64str = "";
  for (let i = 0; i < bStr.length; i += 8) {
    const br = bStr.slice(i, i + 8);
    const value = parseInt(br, 2);
    const ch = chars[value];
    base64str += ch;
  }

  base64str += "=".repeat(equalsToAdd);
  return base64str;
}

function getBinaryString(str) {
  let bStr = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    bStr += ch
      .charCodeAt(0)
      .toString(2)
      .padStart(8, "0");
  }
  return bStr;
}

console.log(myBase64Encode("aa"));
