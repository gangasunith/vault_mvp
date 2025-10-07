function generatePassword(length=16, opts={numbers:true,symbols:true,excludeLookalikes:true}){
  const letters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers='0123456789';
  const symbols='!@#$%^&*()_+{}[]<>?';
  let chars=letters;
  if(opts.numbers) chars+=numbers;
  if(opts.symbols) chars+=symbols;
  if(opts.excludeLookalikes) chars=chars.replace(/[O0Il]/g,'');
  let pwd='';
  for(let i=0;i<length;i++) pwd+=chars[Math.floor(Math.random()*chars.length)];
  return pwd;
}
