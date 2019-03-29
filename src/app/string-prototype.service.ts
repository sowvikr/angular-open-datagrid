includeRef = String.prototype.includes;

String.prototype.equals = equals;
String.prototype.includes = includes;

interface String {
  equals: typeof equals;
  includes: typeof includes;
}

function equals(a:string):boolean {
  return this.toLowerCase() == a.toLowerCase();
}

function includes(searchString:string, position?:number):boolean {
  let k = this.toLowerCase().match(searchString.toLowerCase());
  if (position && k) {
    return k.index === position;
  }
  return !!k;
}



