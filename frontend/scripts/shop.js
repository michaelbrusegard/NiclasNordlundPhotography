// Public Google Cloud Storage Bucket name
const googleFrontEndBucketName = 'frontend-photos.niclasnordlund.com';

// Prices array
const fetchPrices = fetch(
  `https://storage.googleapis.com/storage/v1/b/${googleFrontEndBucketName}/o?fields=items(name)&delimiter=/`
)
  .then((response) => response.json())
  .then((data) => {
    const pricesArray = data.items.map((item) => {
      const name = item.name;
      const price = Number(name.match(/\d+(?=e\.jpg$)/i)[0]);
      return [name, price];
    });

    return pricesArray;
  });

// Wrapper div for shop items
const gridWrapper = document.getElementById('gridWrapper');
const observeGridItems = new IntersectionObserver(shopFadeOnscroll);

// Variables for logic around how many items that need loading
let itemsToLoad = 0;
let itemsLoaded = 0;

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll('.arrow');

// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById('checkoutMenu');
const infoButton = document.getElementById('infoButton');
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');
const redDots = document.querySelectorAll('.redDot');
const infoText =
  'Upon purchase you will receive a full quality digital copy of the photo.';

// Keeping track of the checkout elements
const checkoutButton = document.getElementById('checkoutButton');
const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');
let addedItems = [];
let checkoutMenuClicks = 0;
let itemNumber = 0;
let checkoutTotal = 0;

// Widths of the shopping cart button and checkout menu
const style = getComputedStyle(document.body);
const cartButtonWidth = parseInt(
  style.getPropertyValue('--menuIconSize').slice(0, -2)
);
const checkoutWidth = parseInt(
  style.getPropertyValue('--checkoutWidth').slice(0, -2)
);

// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShowcaseOrHome = [
  'home.html',
  'nature.html',
  'animals.html',
  'architectural.html',
  'portrait.html',
  'sport.html',
  'wedding.html',
];
let navigatedFrom = document.referrer;

// When the DOM is done loading: loads new photo containers and aligns checkout menu
document.addEventListener('DOMContentLoaded', () => {
  slideTransition(shopNav, nav, navigatedFromShowcaseOrHome);
  windowLoad();
  alignCheckout();
});

// Changes to the window: loads new photo containers and aligns checkout menu
window.addEventListener('scroll', () => {
  scrollLoad();
});
window.addEventListener('resize', () => {
  windowLoad();
  alignCheckout();
});
window.addEventListener('orientationChange', () => {
  windowLoad();
  alignCheckout();
});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(nav), 'linkBag').addEventListener(
  'animationend',
  () => {
    animationEndOnNavElements(shopNav, nav);
  }
);
getLinkIcon(getCurrentNavElement(nav), 'linkSignature').addEventListener(
  'animationend',
  () => {
    removeAnimationEndOnNavElements(nav);
  }
);

// Check when the current bag icons are clicked
Array.from(shopNav.children).forEach((element) => {
  getLinkIcon(element, 'linkBag').addEventListener('click', (event) => {
    event.preventDefault();
    redirectToLastLink(navigatedFromShowcaseOrHome);
  });
});

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach((element) =>
  element.addEventListener('click', (event) => {
    event.preventDefault();
    alignCheckout();
    // Check which scale we want to set the new z-index with
    checkoutMenuClicks += 1;
    let scale = 1;
    if (checkoutMenuClicks % 2 == 1) {
      scale = 3;
    }
    // Toggle the menu
    checkoutMenu.classList.toggle('active');
    checkoutMenu.addEventListener(
      'transitionend',
      () => {
        checkoutMenu.style.setProperty(
          '--checkoutMenuZindex',
          `${style.getPropertyValue('--checkoutMenuZindex') * scale}`
        );
      },
      { once: true }
    );
  })
);

infoButton.addEventListener('click', () => {
  alert(infoText);
});

// Logs the current checkout items to alert
checkoutButton.addEventListener('click', () => {
  if (addedItems.length > 0) {
    const itemsToPurchase = [];
    for (const item of addedItems) {
      const name = item.children[2].innerText;
      const price = item.children[1].innerText.slice(0, -1);
      itemsToPurchase.push([name, price]);
    }

    fetch('/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemsToPurchase),
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }
});

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
