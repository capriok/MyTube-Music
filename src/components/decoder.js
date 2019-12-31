export default function decoder(str) {
   str = str.replace(/&amp;/g, "&");
   str = str.replace(/&quot;/g, "\"");
   return str;
}