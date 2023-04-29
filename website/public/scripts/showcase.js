// Arrays for photo path and dimensions
const filesAnimals = [
  ['animals01.jpg', 1700, 1063],
  ['animals02.jpg', 1700, 1133],
  ['animals03.jpg', 1200, 1680],
  ['animals04.jpg', 1700, 1133],
  ['animals05.jpg', 1700, 1063],
  ['animals06.jpg', 1700, 1133],
  ['animals07.jpg', 1700, 1133],
  ['animals08.jpg', 1200, 1680],
  ['animals09.jpg', 1700, 1062],
  ['animals10.jpg', 1680, 1200],
  ['animals11.jpg', 1700, 1062],
  ['animals12.jpg', 1700, 1063],
  ['animals13.jpg', 1700, 850],
  ['animals14.jpg', 1700, 956],
  ['animals15.jpg', 1700, 956],
  ['animals16.jpg', 1700, 904],
  ['animals17.jpg', 1700, 785],
  ['animals18.jpg', 1700, 904],
  ['animals19.jpg', 1700, 1046],
];
const filesArchitectural = [
  ['architectural01.jpg', 1700, 1063],
  ['architectural02.jpg', 1200, 1600],
  ['architectural03.jpg', 1700, 1133],
  ['architectural04.jpg', 1700, 907],
  ['architectural05.jpg', 1700, 1190],
  ['architectural06.jpg', 1700, 956],
  ['architectural07.jpg', 1700, 956],
  ['architectural08.jpg', 1700, 956],
  ['architectural09.jpg', 1680, 1200],
  ['architectural10.jpg', 1700, 1105],
  ['architectural11.jpg', 1680, 1200],
  ['architectural12.jpg', 1700, 1063],
  ['architectural13.jpg', 1700, 1106],
  ['architectural14.jpg', 1700, 1062],
  ['architectural15.jpg', 1700, 956],
  ['architectural16.jpg', 1700, 1063],
  ['architectural17.jpg', 1700, 1000],
  ['architectural18.jpg', 1700, 956],
  ['architectural19.jpg', 1700, 1063],
];
const filesNature = [
  ['nature01.jpg', 1700, 1009],
  ['nature02.jpg', 1680, 1200],
  ['nature03.jpg', 1700, 1063],
  ['nature04.jpg', 1700, 956],
  ['nature05.jpg', 1700, 1063],
  ['nature06.jpg', 1700, 1133],
  ['nature07.jpg', 1133, 1700],
  ['nature08.jpg', 1700, 744],
  ['nature09.jpg', 1700, 1063],
  ['nature10.jpg', 1700, 904],
  ['nature11.jpg', 1700, 956],
  ['nature12.jpg', 1700, 1074],
  ['nature13.jpg', 1200, 1200],
  ['nature14.jpg', 1680, 1200],
  ['nature15.jpg', 1700, 1062],
  ['nature16.jpg', 1700, 1133],
  ['nature17.jpg', 1700, 904],
];
const filesPortrait = [
  ['portrait01.jpg', 1125, 1700],
  ['portrait02.jpg', 1700, 1134],
  ['portrait03.jpg', 1700, 1063],
  ['portrait04.jpg', 1700, 1134],
  ['portrait05.jpg', 1200, 1200],
  ['portrait06.jpg', 1700, 956],
  ['portrait07.jpg', 1700, 1133],
  ['portrait08.jpg', 1133, 1700],
  ['portrait09.jpg', 1700, 956],
  ['portrait10.jpg', 1600, 1200],
  ['portrait11.jpg', 1700, 1063],
  ['portrait12.jpg', 1700, 1133],
  ['portrait13.jpg', 1133, 1700],
  ['portrait14.jpg', 1600, 1200],
  ['portrait15.jpg', 1700, 1133],
  ['portrait16.jpg', 1700, 895],
];
const filesSport = [
  ['sport01.jpg', 1600, 1200],
  ['sport02.jpg', 1700, 956],
  ['sport03.jpg', 1700, 1062],
  ['sport04.jpg', 1700, 1062],
  ['sport05.jpg', 1680, 1200],
  ['sport06.jpg', 1700, 1062],
  ['sport07.jpg', 1700, 1062],
  ['sport08.jpg', 1600, 1200],
  ['sport09.jpg', 1700, 1133],
  ['sport10.jpg', 1600, 1200],
  ['sport11.jpg', 1700, 956],
  ['sport12.jpg', 1700, 956],
  ['sport13.jpg', 1700, 1062],
  ['sport14.jpg', 1700, 956],
  ['sport15.jpg', 1700, 956],
  ['sport16.jpg', 1700, 1133],
  ['sport17.jpg', 1600, 1200],
  ['sport18.jpg', 1700, 850],
];
const filesWedding = [
  ['wedding01.jpg', 1133, 1700],
  ['wedding02.jpg', 1700, 1063],
  ['wedding03.jpg', 1700, 1133],
];

// Column variables
let columnSize = 384;
let maxNumberColumns = 5;

// Chosing array
let page = window.location.pathname.split('/').pop().slice(0, -5);
let files = [];
if (page == 'animals') {
  files = filesAnimals;
} else if (page == 'architectural') {
  files = filesArchitectural;
} else if (page == 'nature') {
  files = filesNature;
  columnSize *= 1.5;
} else if (page == 'portrait') {
  files = filesPortrait;
} else if (page == 'sport') {
  files = filesSport;
} else if (page == 'wedding') {
  files = filesWedding;
  columnSize *= 1.5;
}

// Create an observer for showcaseFadeOnscroll
const addPhotosFadeOnScroll = new IntersectionObserver(showcaseFadeOnscroll);

// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loads photos into columns
document.addEventListener('DOMContentLoaded', () => {
  slideTransition(nav, shopNav, navigatedFromShop);
  loadPhotos(files);
});
window.addEventListener('resize', () => {
  loadPhotos(files);
});
window.addEventListener('orientationChange', () => {
  loadPhotos(files);
});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener(
  'animationend',
  () => {
    animationEndOnNavElements(nav, shopNav);
  }
);
getLinkIcon(getCurrentNavElement(shopNav), 'linkSignature').addEventListener(
  'animationend',
  () => {
    removeAnimationEndOnNavElements(shopNav);
  }
);

// Checks when menu is clicked
menu.addEventListener('click', () => {
  mobileMenu(menu, nav);
});
