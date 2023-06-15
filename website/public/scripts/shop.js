// get Public Google Cloud Storage Bucket name
async function getGCloudPublicPhotosBucket() {
    const response = await fetch("/getGCloudPublicPhotosBucket");
    const data = await response.json();
    return data;
}

// Prices array
async function getPricesArray(gCloudPublicPhotosBucket) {
    const response = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${gCloudPublicPhotosBucket}/o?fields=items(name)&delimiter=/`
    );
    const data = await response.json();
    const pricesArray = data.items.map((item) => {
        const name = item.name;
        const price = parseInt(name.match(/\d+(?=e\.jpg$)/i)[0]);
        return [name, price];
    });
    return pricesArray;
}

// Wrapper div for shop items
const gridWrapper = document.getElementById("gridWrapper");
const observeGridItems = new IntersectionObserver(shopFadeOnscroll);

// Variables for logic around how many items that need loading
let itemsToLoad = 0;
let itemsLoaded = 0;

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll(".arrow");

// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById("checkoutMenu");
const infoButton = document.getElementById("infoButton");
const cartButtons = document.querySelectorAll(".linkIcon.linkCart");
const redDots = document.querySelectorAll(".redDot");
const infoText = document.getElementById("infoText");
const errorText = document.getElementById("errorText");

// Keeping track of the checkout elements
const checkoutButton = document.getElementById("checkoutButton");
const checkoutTotalDisplay = document.getElementById("checkoutTotalDisplay");
let cart = [];
let cartString = "";
let addedItems = [];
let checkoutMenuClicks = 0;
let itemNumber = 0;
let checkoutTotal = 0;

// Widths of the shopping cart button and checkout menu
const style = getComputedStyle(document.body);
const cartButtonWidth = parseInt(
    style.getPropertyValue("--menuIconSize").slice(0, -2)
);
const checkoutWidth = parseInt(
    style.getPropertyValue("--checkoutWidth").slice(0, -2)
);

// Variables for slide transition
const nav = document.getElementById("nav");
const shopNav = document.getElementById("shopNav");
const navigatedFromShowcaseOrHome = [
    "home.html",
    "nature.html",
    "animals.html",
    "architectural.html",
    "portrait.html",
    "sport.html",
    "wedding.html",
    "sucess.html",
];
let navigatedFrom = document.referrer;

// When the DOM is done loading: loads new photo containers and aligns checkout menu
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(shopNav, nav, navigatedFromShowcaseOrHome);
    retrieveCart();
    windowLoad();
    alignCheckout();
});

// Changes to the window: loads new photo containers and aligns checkout menu
window.addEventListener("scroll", () => {
    scrollLoad();
});
window.addEventListener("resize", () => {
    windowLoad();
    alignCheckout();
});
window.addEventListener("orientationChange", () => {
    windowLoad();
    alignCheckout();
});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(nav), "linkBag").addEventListener(
    "animationend",
    () => {
        animationEndOnNavElements(shopNav, nav);
    }
);
getLinkIcon(getCurrentNavElement(nav), "linkSignature").addEventListener(
    "animationend",
    () => {
        removeAnimationEndOnNavElements(nav);
    }
);

// Check when the current bag icons are clicked
Array.from(shopNav.children).forEach((element) => {
    getLinkIcon(element, "linkBag").addEventListener("click", (event) => {
        event.preventDefault();
        redirectToLastLink(navigatedFromShowcaseOrHome);
    });
});

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach((element) =>
    element.addEventListener("click", (event) => {
        event.preventDefault();
        alignCheckout();
        // Check which scale we want to set the new z-index with
        checkoutMenuClicks += 1;
        let scale = 1;
        if (checkoutMenuClicks % 2 === 1) {
            scale = 3;
        }
        // Toggle the menu
        checkoutMenu.classList.toggle("active");
        checkoutMenu.addEventListener(
            "transitionend",
            () => {
                checkoutMenu.style.setProperty(
                    "--checkoutMenuZindex",
                    `${style.getPropertyValue("--checkoutMenuZindex") * scale}`
                );
            },
            { once: true }
        );
    })
);

infoButton.addEventListener("click", () => {
    if (infoText.open) {
        infoText.close();
    } else {
        if (addedItems.length > 1) {
            infoText.textContent =
                "Upon purchase you will receive an Email with a link to download the full quality digital copies of the photos. Contact me if you want to buy prints.";
        } else {
            infoText.textContent =
                "Upon purchase you will receive an Email with a link to download the full quality digital copy of the photo. Contact me if you want to buy prints.";
        }
        infoText.show();
    }
});

//
checkoutButton.addEventListener("click", async () => {
    // Check if there are any items in the "addedItems" array
    if (addedItems.length > 0) {
        const itemsToPurchase = [];
        // Iterate through each item in "addedItems" array
        for (const item of addedItems) {
            // Extract the name and price of the item from its HTML elements
            const name = item.children[2].textContent;
            const price = item.children[1].textContent.slice(0, -1);
            // Add the item's name and price to the "itemsToPurchase" array
            itemsToPurchase.push([name, price]);
        }

        try {
            // Make a POST request to the "/checkout-session" endpoint with the "itemsToPurchase" array as the request payload
            const response = await fetch("/checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemsToPurchase),
            });

            if (response.ok) {
                // If the response is successful, extract the "url" property from the response JSON
                const { url } = await response.json();
                // Remove the "cart" item from the session storage
                sessionStorage.removeItem("cart");
                // Redirect the user to the obtained "url"
                window.location = url;
            } else {
                // If the response is not successful, extract the error message from the response JSON
                const error = await response.json();
                // Throw an error with the extracted error message
                throw new Error(error.error);
            }
        } catch (e) {
            errorText.textContent = "Error: Unable to connect to checkout.";
            errorText.show();
            // Catch any errors that occurred during the fetch request or response processing
            console.error(e);
        }
    }
});

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
