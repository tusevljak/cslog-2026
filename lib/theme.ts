/**
 * Inline skript za <head> — postavlja .dark klasu PRE prvog iscrtavanja,
 * da korisnik sa tamnom temom ne vidi beli blesak pri učitavanju.
 * (Mora biti van 'use client' modula da bi ga server layout uvezao kao string.)
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`
