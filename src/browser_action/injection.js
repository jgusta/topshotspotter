function calculor() {
  const re = /\#(\d+) - \$(\d+)\.\d{2}/;
  const squanchMatch = function (y) {
    if (typeof y !== "string") {
      return false;
    }
    let result = y.match(re);
    if (result == null) {
      return false;
    }
    if (result.length < 3) {
      return false;
    }
    return true;
  };
  const cmpLowestPrice = function (a, b) {
    let aMatch = a.match(re);
    let bMatch = b.match(re);
    if (aMatch == null || aMatch.length < 3) return 1;

    if (bMatch == null || bMatch.length < 3) return -1;

    return a.match(re)[2] - b.match(re)[2];
  };
  const cmpLowestSerial = function (a, b) {
    let aMatch = a.match(re);
    let bMatch = b.match(re);
    return aMatch[1] - bMatch[1];
  };

  const cmpHighestSpread = function (a, b) {
    let aMatch = a.match(re);
    let bMatch = b.match(re);
    return 300000 - bMatch[2] - bMatch[1] - (300000 - aMatch[2] - aMatch[1]);
  };

  const filterUnder = function (max) {
    return (a) => {
      let aMatch = a.match(re)[2];
      if (typeof aMatch === "undefined" || aMatch == null) {
        return false;
      }
      return aMatch <= max;
    };
  };

  const only = function (topNumber) {
    let count = 0;
    return (x) => count++ < topNumber;
  };

  function ass(myList) {
    let snodeList = myList.filter(squanchMatch);
    return {
      [`Lowest serials under \$100`]: snodeList
        .sort(cmpLowestSerial)
        .filter(filterUnder(100))
        .filter(only(10)),
      [`Lowest serials under \$1000`]: snodeList
        .sort(cmpLowestSerial)
        .filter(filterUnder(1000))
        .filter(only(10)),
      [`Lowest Priced`]: snodeList.sort(cmpLowestPrice).filter(only(10)),
      [`Highest Value under \$100`]: snodeList
        .sort(cmpHighestSpread)
        .filter(filterUnder(100))
        .filter(only(10)),
      [`Highest Value under \$1000`]: snodeList
        .sort(cmpHighestSpread)
        .filter(filterUnder(1000))
        .filter(only(10)),
    };
  }
  function getText(element) {
    let hList = element.children;
    let tList = [];
    for (i = 0; i < hList.length; i++) {
      tList.push(hList.item(i).textContent);
    }
    console.log(tList);
    return tList;
  }
  let list = getText(document.getElementById("moment-detailed-serialNumber"));
  let rest = ass(list);
  return rest;
}
