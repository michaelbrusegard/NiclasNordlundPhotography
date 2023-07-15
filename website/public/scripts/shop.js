// get Public Google Cloud Storage Bucket name
async function getPublicPhotosBucket() {
    const response = await fetch("/get-public-photos-bucket");
    const data = await response.json();
    return data;
}

// Prices array
async function getPricesArray(publicPhotosBucket) {
    const response = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${publicPhotosBucket}/o?fields=items(name)&delimiter=/`
    );
    const data = await response.json();
    const pricesArray = data.items
        .map((item) => {
            const name = item.name;
            let price;
            try {
                price = parseInt(name.match(/\d+(?=e\.jpg$)/i)[0]);
            } catch (error) {
                console.error("Error: Unable to get price from " + name + ".");
                return; // Skip adding the item to the pricesArray
            }
            return [name, price];
        })
        .filter(Boolean); // Remove undefined items from the pricesArray
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
const navigatedFromArray = [
    "",
    "nature",
    "animals",
    "architectural",
    "portrait",
    "sport",
    "wedding",
    "sucess",
    "bug",
];

const navigatedBackArray = [
    "",
    "nature",
    "animals",
    "architectural",
    "portrait",
    "sport",
    "wedding",
    "bug",
];
let navigatedFrom = document.referrer;

// When the DOM is done loading: loads new photo containers and aligns checkout menu
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(shopNav, nav, navigatedFromArray);
    retrieveCart();
    alignCheckout();
    contentLoad();
});

// Changes to the window: loads new photo containers and aligns checkout menu
window.addEventListener("scroll", () => {
    scrollLoad();
    displayCopyrightFooter(document.documentElement);
});
window.addEventListener("resize", () => {
    windowLoad();
    alignCheckout();
    displayCopyrightFooter(document.documentElement);
});
window.addEventListener("orientationChange", () => {
    windowLoad();
    alignCheckout();
    displayCopyrightFooter(document.documentElement);
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
        redirectToLastLink(navigatedBackArray);
    });
});

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach((element) =>
    element.addEventListener("click", (event) => {
        event.preventDefault();
        checkoutMenu.style.visibility = "visible";
        alignCheckout();
        // Check which scale we want to set the new z-index with
        checkoutMenuClicks += 1;
        let scale = 1;
        if (checkoutMenuClicks % 2 === 1) {
            scale = 3;
        }
        let isActive = true;
        if (checkoutMenu.classList.contains("active")) {
            isActive = false;
        }
        // Toggle the menu
        checkoutMenu.classList.toggle("active");
        checkoutMenu.addEventListener(
            "transitionend",
            () => {
                if (isActive === false) {
                    checkoutMenu.style.visibility = "hidden";
                    isActive = true;
                }
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
    toggleInfoText();
});

infoButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        toggleInfoText();
    }
});

function toggleInfoText() {
    if (infoText.open) {
        infoText.close();
    } else {
        if (addedItems.length > 1) {
            infoText.textContent =
                "Upon purchase, you will receive an Email with a link to download the full quality digital copies of the photos. Contact me if you want to buy prints directly.";
        } else {
            infoText.textContent =
                "Upon purchase, you will receive an Email with a link to download the full quality digital copy of the photo. Contact me if you want to buy prints directly.";
        }
        infoText.show();
    }
}

checkoutButton.addEventListener("click", async () => {
    purchaseItems();
});

checkoutButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        purchaseItems();
    }
});

async function purchaseItems() {
    if (addedItems.length > 0) {
        checkoutButton.disabled = true;
        checkoutButton.style.backgroundColor = "var(--expandedPageColor)";
        checkoutButton.style.cursor = "auto";
        checkoutButton.textContent = "Loading";
        let dots = "";
        const loadingInterval = setInterval(function () {
            checkoutButton.textContent = "Loading" + dots;
            dots += ".";
            if (dots.length > 3) {
                dots = "";
            }
        }, 400);

        const itemsToPurchase = [];
        for (const item of addedItems) {
            const name = item.children[2].textContent;
            const price = item.children[1].textContent.slice(0, -1);
            itemsToPurchase.push([name, price]);
        }

        try {
            const response = await fetch("/checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemsToPurchase),
            });

            if (response.ok) {
                const { url } = await response.json();
                window.location = url;
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            errorText.textContent = "Error: Unable to connect to checkout.";
            errorText.show();
            console.error(error);
        } finally {
            clearInterval(loadingInterval); // Stop the loading animation
            checkoutButton.disabled = false;
            checkoutButton.style.backgroundColor = "";
            checkoutButton.style.cursor = "pointer";
            checkoutButton.textContent = "Checkout";
        }
    } else {
        errorText.textContent = "Error: Cart is empty.";
        errorText.show();
        setTimeout(() => {
            errorText.close();
        }, 5000);
    }
}

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
