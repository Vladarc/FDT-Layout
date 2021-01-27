
const BODY = document.body;

// mobile menu nodes
const menuList = document.querySelectorAll('.category-left__sidebox_item--submenu');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const mobileMenu = document.querySelector('.category-left');
const mobileMenuClose = document.querySelector('.category-left__title-mobile_close');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');

// filters nodes;
const openMobileFilterListBtn = document.querySelector('.category-filters__filter-btn');
const mobileFilterList = document.querySelector('.filters');
const filterBackdrop = document.querySelector('.filters-backdrop');
const closeMobileFilterList = document.querySelector('.filters__form__close');

// categotry collapse 
const categoryListToggler = document.querySelector('.category-left__title--collapse-btn');
const categoryList = document.querySelector('.category-left__sidebox--collapse');

const toggleCategoryListHandler = () => {
  if(categoryList.offsetHeight < 10) {
        categoryList.style = `height:${categoryList.scrollHeight}px;overflow: visible;`
    } else {
        categoryList.style = `height:0px`
    }
}
categoryListToggler.addEventListener('click', toggleCategoryListHandler)





const openMobileFilterList = () => {
    mobileFilterList.classList.toggle('filters--open');
    filterBackdrop.classList.toggle('filters-backdrop--open');
    BODY.classList.toggle('mobile-filters-showing')


}
const removeMobileFilterList = () => {
    mobileFilterList.classList.toggle('filters--open');
    filterBackdrop.classList.toggle('filters-backdrop--open');
    BODY.classList.toggle('mobile-filters-showing')
}

openMobileFilterListBtn.addEventListener('click',  openMobileFilterList);
filterBackdrop.addEventListener('click', removeMobileFilterList);
closeMobileFilterList.addEventListener('click', removeMobileFilterList);



function toggleMobileMenu(event) {
    event.preventDefault();
    mobileMenu.classList.toggle('category-left--open');
    mobileOverlay.classList.toggle('mobile-menu-overlay--open');
    document.body.classList.toggle('mobile-menu-open')
}

function toggleCollapseHandler(e) {
    const { target } = e ;
    if(!target.classList.contains('category-left__sidebox_icon')) return;
    e.preventDefault();
    const ul = this.querySelector('ul');
    let height = ul.scrollHeight;
    if(target.classList.contains('category-left__sidebox-open')) {
        ul.style = '';
    } else {
        ul.style = `height:${height}px;`;
    }
    target.classList.toggle('category-left__sidebox-open');
}

menuList.forEach(node => {
    node.addEventListener('click', toggleCollapseHandler)
})

function addMobileMenuHandler() {
    mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
    mobileMenuClose.removeEventListener('click', toggleMobileMenu);
    mobileOverlay.removeEventListener('click', toggleMobileMenu);
    mobileOverlay.classList.remove('mobile-menu-overlay--open')
 }
 mobileMenuBtn.addEventListener('click', toggleMobileMenu);
 mobileMenuClose.addEventListener('click', toggleMobileMenu);
 mobileOverlay.addEventListener('click', toggleMobileMenu);
