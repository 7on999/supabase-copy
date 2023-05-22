const menuItems = document.querySelectorAll('.menu__menu-item')
const svgItems = document.querySelectorAll('.svg-icon')
const btnsBlocks = document.querySelectorAll('.btns-block')
const dashboardImg = document.querySelector('.figure-dashboards-img')
const copyBtns = document.querySelectorAll('.btn-copy')
const switcherTheme = document.querySelector('.switcher-theme')
const switcherThemeCircle = document.querySelector('.switcher-theme-circle')
const bodyPage = document.querySelector('body')
const allSubMenu = document.querySelectorAll('.sub-menu')

const configTextForCopying = {
  'upload-file': 'const spaceCat = event.target.files[0] \nconst { data, error } = await supabase \n.storage  \n.from("avatars") \n.upload("space-cat.png", spaceCat)',
  download:'const { data, error } = await supabase \n.storage  \n.from("avatars") \n.download("space-cat.png")',
  'list-all':'const { data, error } = await supabase \n.storage  \n.from("avatars") \n.list()',
  'move-files':'const { data, error } = await supabase \n.storage  \n.from("avatars") \n.move("public/space-cat.png", "public/space-cat.png")',
  delete: 'const { data, error } = await supabase \n.storage  \n.from("avatars") \n.remove(["avatar1.png", "avatar2.png"])',
  'copy-access': 'Create policy "Public Access" \nonstoroge.objects for all \nusing(bucked_1="avatar")',
  'public-access-folder': 'const { data }  =  supabase \n.storage  \n.from("public-bucket") \n.getPublicUrl("folter/avatar1.png")',
  auth: 'const loggedInUserId="d0714948" \nconst { data, error } = await supabase \n.from("users") \n.select("user_id, name") \n.eq("user_id", loggedInUserId)',
}

menuItems.forEach(menuItem=>{
  menuItem.addEventListener('click', ()=>{

    const svgItem = menuItem.querySelector('.svg-icon')

    if (svgItem) {
      svgItem.classList.toggle('svg-icon_active');
      svgItems.forEach(svgItem=>{
        if (svgItem.parentElement.id!==menuItem.id) {
          svgItem.classList.remove('svg-icon_active')
        }
      })

      const ulSubMenu = menuItem.parentElement.querySelector('.sub-menu');
      console.log('ulSubMenu:', ulSubMenu)
      ulSubMenu.classList.toggle('sub-menu_active')
      allSubMenu.forEach((subMenu)=>{
        if (subMenu!==ulSubMenu) subMenu.classList.remove('sub-menu_active')
      })
    }
  })
})


btnsBlocks.forEach(btnsBlock=>{

  btnsBlock.addEventListener('click', function(e) {

    if(e.target.classList.contains('btns-block__btn')){
      const currentActiveBtn = btnsBlock.querySelector('.btns-block__btn_active')
    
      if (currentActiveBtn===e.target) return

      const btns = btnsBlock.querySelectorAll('.btns-block__btn')
      btns.forEach(btn=>{
        btn.classList.remove('btns-block__btn_active')
      })
      e.target.classList.add('btns-block__btn_active')

      const imgEl = btnsBlock.parentElement.querySelector('.img-for-btn')

      imgEl.style.opacity = 0.1
      setTimeout(()=>{
        imgEl.src=`./assets/${e.target.id}.webp`
        imgEl.style.opacity = 1
      }, 400)
    }
  })
})


copyBtns.forEach(bntCopy=>{
  bntCopy.addEventListener('click', ()=>{
    const btnAcitveId = bntCopy.parentElement.querySelector('.img-for-btn').src.split('/').at(-1).split('.')[0]

    navigator.clipboard.writeText(configTextForCopying[btnAcitveId]);
    alert("Copied the text: " + configTextForCopying[btnAcitveId]);
  })
})

switcherTheme.addEventListener('click', ()=>{
  switcherThemeCircle.classList.toggle('switcher-theme-circle_day-mode')
  bodyPage.classList.toggle('body_day-mode')
})

bodyPage.addEventListener('click', (e)=>{
  const activeBtn = document.querySelector('.svg-icon_active')
  const activeSubMenu = document.querySelector('.sub-menu_active')
  const clickWasInSubMenu = e.target.closest('.menu__menu-item-wrapper')

  if ( activeBtn && !clickWasInSubMenu ){
    activeBtn.classList.remove('svg-icon_active')
    activeSubMenu.classList.remove('sub-menu_active')
  }
})