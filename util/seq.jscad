seq = function(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}
  