import{t as e}from"./supabase-CKYT3bNG.js";/* empty css              */var t={en:{goBack:`Go back`,chooseDate:`Choose a Date`,chooseSubtitle:`Select the event that works best for you`,continueBtn:`CONTINUE TO REGISTRATION`,spotsAvailable:`spots available`},nl:{goBack:`Ga terug`,chooseDate:`Kies een Datum`,chooseSubtitle:`Selecteer het event dat het beste bij je past`,continueBtn:`GA VERDER NAAR REGISTRATIE`,spotsAvailable:`plaatsen beschikbaar`},fr:{goBack:`Retour`,chooseDate:`Choisissez une Date`,chooseSubtitle:`Sélectionnez l'événement qui vous convient le mieux`,continueBtn:`CONTINUER VERS L'INSCRIPTION`,spotsAvailable:`places disponibles`}},n=[{id:1,date:`June 15, 2026`,title:`Studio 1`,time:`18:00 - 22:00`,location:`Studio 1`,maxSpots:60},{id:2,date:`September 22, 2026`,title:`Studio 1`,time:`18:00 - 22:00`,location:`Studio 1`,maxSpots:60},{id:3,date:`December 20, 2026`,title:`Studio 1`,time:`18:00 - 22:00`,location:`Studio 1`,maxSpots:60},{id:4,date:`March 19, 2027`,title:`Studio 1`,time:`18:00 - 22:00`,location:`Studio 1`,maxSpots:60}],r=document.getElementById(`datesList`),i=document.getElementById(`continueBtn`),a=localStorage.getItem(`selectedEventId`);async function o(t){let{count:n,error:r}=await e.from(`event_registrations`).select(`id`,{count:`exact`,head:!0}).eq(`selected_date`,t.date);return r?0:n||0}async function s(e){r.innerHTML=``;for(let s of n){let n=await o(s),c=Math.max(s.maxSpots-n,0),l=Math.min(n/s.maxSpots*100,100),u=document.createElement(`div`);u.className=`date-card ${a==s.id?`active`:``}`,u.dataset.id=s.id,u.innerHTML=`
      <div class="date-row">
        <div class="date-icon">
          <img src="./images/EventRed.svg" alt="">
        </div>

        <div class="date-title">
          ${s.date}
        </div>
      </div>

      <div class="date-row">
        <div class="date-icon">
          <img src="./images/ClockRed.svg" alt="">
        </div>

        <div class="date-info">
          ${s.time}
        </div>
      </div>

      <div class="date-row">
        <div class="date-icon">
          <img src="./images/LocationRed.svg" alt="">
        </div>

        <div class="date-info">
          ${s.location}
        </div>
      </div>

      <div class="spots">
        <img src="./images/PeopleRed.svg" alt="">

        <span>
          ${c} ${t[e].spotsAvailable}
        </span>
      </div>

      <div class="progress-bar">
        <div 
          class="progress-fill"
          style="width: ${l}%"
        ></div>
      </div>
    `,u.addEventListener(`click`,()=>{document.querySelectorAll(`.date-card`).forEach(e=>{e.classList.remove(`active`)}),u.classList.add(`active`),a=s.id,localStorage.setItem(`selectedEventId`,s.id),localStorage.setItem(`selectedEventDate`,s.date),localStorage.setItem(`selectedEventTitle`,s.title),localStorage.setItem(`selectedEvent`,JSON.stringify(s)),i.classList.add(`active`)}),r.appendChild(u)}}function c(e){localStorage.setItem(`language`,e),document.querySelectorAll(`.lang-btn`).forEach(e=>{e.classList.remove(`active`)}),document.getElementById(`btn-${e}`).classList.add(`active`),document.querySelectorAll(`[data-translate]`).forEach(n=>{let r=n.dataset.translate;n.textContent=t[e][r]}),s(e)}i.addEventListener(`click`,()=>{if(!a)return;let e=n.find(e=>e.id==a);localStorage.setItem(`selectedEventId`,e.id),localStorage.setItem(`selectedEventDate`,e.date),localStorage.setItem(`selectedEventTitle`,e.title),localStorage.setItem(`selectedEvent`,JSON.stringify(e)),window.location.href=`Eventregistration.html`}),document.getElementById(`btn-nl`).addEventListener(`click`,()=>{c(`nl`)}),document.getElementById(`btn-en`).addEventListener(`click`,()=>{c(`en`)}),document.getElementById(`btn-fr`).addEventListener(`click`,()=>{c(`fr`)}),a&&i.classList.add(`active`),c(localStorage.getItem(`language`)||`en`);