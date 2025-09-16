import{a as E,S,i as l}from"./assets/vendor-BSTwZ_tR.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function f(t,o=1){const s="https://pixabay.com",a="52284043-e07dc2496c8ab93aaf5c906d1",e="/api/",r={key:a,q:t,page:o,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"};return(await E.get(`${s}${e}`,{params:r})).data.hits}const P=new S(".gallery a",{captionsData:"alt",captionDelay:250}),d=document.querySelector(".gallery"),m=document.querySelector(".loader");function q(t){return t.map(({webformatURL:o,largeImageURL:s,tags:a,likes:e,views:r,comments:n,downloads:w})=>`<li class="photo-item">
          <a class="photo-link" href="${s}">
            <img
              class="photo-thumb"
              src="${o}"
              alt="${a}"
            />
            <div class="photo-stats">
              <div class="stat-block">
                <span class="stat-label">Likes</span>
                <span class="stat-value">${e}</span>
              </div>
              <div class="stat-block">
                <span class="stat-label">Views</span>
                <span class="stat-value">${r}</span>
              </div>
              <div class="stat-block">
                <span class="stat-label">Comments</span>
                <span class="stat-value">${n}</span>
              </div>
              <div class="stat-block">
                <span class="stat-label">Downloads</span>
                <span class="stat-value">${w}</span>
              </div>
            </div>
          </a>
        </li>`).join("")}function g(t,o=!1){const s=q(t);if(o){d.insertAdjacentHTML("beforeend",s);const a=document.querySelector(".gallery .photo-item");if(a){const{height:e}=a.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}else d.innerHTML=s;P.refresh()}function $(){d.innerHTML=""}function y(){m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}const L=document.querySelector(".form"),h=document.querySelector("#load-more");let c="",i=1,M=0;const p=15;L.addEventListener("submit",R);h.addEventListener("click",B);async function R(t){t.preventDefault();const o=t.currentTarget.elements["search-text"].value.trim();if(!o){l.warning({title:"Warning",message:"please enter a search query"});return}o!==c&&(c=o,i=1),$(),u(),y();try{const s=await f(c,i);if(M=s.length>0?p*i:0,!s||s.length===0){l.error({position:"topRight",message:"Sorry, there are no images matching your search query!"});return}g(s),i+=1,s.length===p&&b()}catch(s){console.error("Error fetching images:",s),l.error({position:"topRight",message:"Something went wrong. Please try again later."})}finally{v(),L.reset()}}async function B(){y(),u();try{const t=await f(c,i);if(!t||t.length===0){l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),u();return}g(t,!0),i+=1,t.length<p?(u(),l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):b()}catch(t){console.error("Error fetching images:",t),l.error({position:"topRight",message:"Something went wrong while loading more images."})}finally{v()}}function b(){h.classList.remove("is-hidden")}function u(){h.classList.add("is-hidden")}
//# sourceMappingURL=index.js.map
