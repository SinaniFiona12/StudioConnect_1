import{t as e}from"./supabase-CKYT3bNG.js";/* empty css              */var t=[];async function n(){let{data:t,error:n}=await e.from(`studios`).select(`*`);return n?(console.error(`Error fetching studios:`,n),[]):(t||[]).sort((e,t)=>e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:`base`}))}function r(e){let t=document.getElementById(`studios-container`);if(t.innerHTML=``,e.length===0){t.innerHTML=`<p>No studios found.</p>`;return}e.forEach(e=>{let n=document.createElement(`a`);n.href=`information.html?id=${e.id}`,n.className=`studio-card`,n.innerHTML=`
            <div class="studio-icon-box">
              <img src="images/Icon (2).svg" alt="Building Icon">
            </div>
            <div class="studio-info">
              <div class="studio-name">${e.name}</div>
              <div class="studio-type">Creative production space</div>
            </div>
            <img src="images/Container (4).svg" alt="Arrow Right" class="arrow-right">
          `,t.appendChild(n)})}async function i(){t=await n(),r(t)}document.getElementById(`search-input`).addEventListener(`input`,e=>{let n=e.target.value.toLowerCase();r(t.filter(e=>e.name.toLowerCase().includes(n)))}),i();