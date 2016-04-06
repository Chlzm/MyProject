var o = {
    a : 1,
    b : 2,
    c : 3
}
console.log(Object.keys(o).filter(function(v){
    return v == 'a';
}));