// process the contents of a .csv file into a JSON object
export const processFile = text => {
  const allTextLines = text.split(/\r\n|\n/);
  const headers = allTextLines[0].split(",");
  let lines = [];

  for (let i = 1; i < allTextLines.length; i++) {
    const data = allTextLines[i].split(",");
    if (data.length === headers.length) {
      let curr = {};
      for (var j = 0; j < headers.length; j++) {
        curr[headers[j]] = data[j];
      }
      lines.push(curr);
    }
  }
  return { content: lines, headers: headers };
};

export default { processFile };
