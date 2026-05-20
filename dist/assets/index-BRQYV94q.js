import{t as e}from"./supabase-CKYT3bNG.js";/* empty css              */var t=document.getElementById(`carousel`),n=document.getElementById(`carouselDots`),r=0,i=[];async function a(){let{data:t,error:n}=await e.from(`hero_carousel`).select(`*`).eq(`active`,!0).order(`sort_order`,{ascending:!0});if(console.log(`CAROUSEL DATA:`,t),n){console.error(n);return}i=t,o(),s()}function o(){t.innerHTML=``,n.innerHTML=``,i.forEach((e,r)=>{let i=document.createElement(`div`);i.className=`carousel-item ${r===0?`active`:``}`,i.style.backgroundImage=`url(${e.image_url})`,i.innerHTML=`
      <div class="carousel-overlay">

        <span class="carousel-badge">
          ${e.badge||``}
        </span>

        <h1>${e.title}</h1>

        <p>${e.subtitle||``}</p>

      </div>
    `,t.appendChild(i);let a=document.createElement(`div`);a.className=`dot ${r===0?`active`:``}`,n.appendChild(a)})}function s(){i.length<=1||setInterval(()=>{let e=document.querySelectorAll(`.carousel-item`),t=document.querySelectorAll(`.dot`);!e.length||!t.length||(e[r]?.classList.remove(`active`),t[r]?.classList.remove(`active`),r++,r>=e.length&&(r=0),e[r]?.classList.add(`active`),t[r]?.classList.add(`active`))},4e3)}async function c(){let{data:t,error:n}=await e.from(`news`).select(`*`).eq(`active`,!0).order(`published_at`,{ascending:!1});if(console.log(`NEWS DATA:`,t),n){console.error(n);return}let r=document.getElementById(`newsContainer`);r.innerHTML=``,t.forEach(e=>{r.innerHTML+=`
    <div class="news-card">

     <div class="news-header">

  <img
    src="${e.icon_url}"
    class="news-icon"
    alt="${e.title}"
  />

  <span class="news-date">
    ${new Date(e.published_at).toLocaleDateString()}
  </span>

</div >


      <h3 class="titleH">${e.title}</h3>

      <p>${e.description}</p>

    </div>
  `})}async function l(){let{data:t,error:n}=await e.from(`productions`).select(`*`).eq(`active`,!0);if(console.log(`PRODUCTIONS DATA:`,t),n){console.error(n);return}let r=document.getElementById(`productionList`);r.innerHTML=``,t.forEach(e=>{r.innerHTML+=`
      <div class="production-card">

        <img
          src="${e.image_url}"
          class="production-image"
        />

        <div class="production-info">

          <h3>${e.title}</h3>

          <p>${e.studio}</p>

          <span>
        ${String(e.start_time).slice(0,5)}
-
        ${String(e.end_time).slice(0,5)}
          </span>

        </div>

      </div>
    `})}a(),c(),l();