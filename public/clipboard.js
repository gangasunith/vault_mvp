function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>{
    setTimeout(()=>navigator.clipboard.writeText(''),15000);
  });
}
