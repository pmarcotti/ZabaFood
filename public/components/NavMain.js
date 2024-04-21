import inputEntry from "./inputEntry.js";
import text from "./Text.js";
import buttonGray from "./ButtonComponent.js";
import textA from "./Text-a.js";
import CategoryModal from "../components/CategoryModal.js";
import CartModal from "./CartModal.js";
import router from "../js/routes.js";

export default async () => {
    const divNavMain = document.createElement("div");
    divNavMain.classList.add("div-nav-main");

    const divLightGreen = document.createElement("div");
    divLightGreen.classList.add("div-light-green");
    divNavMain.appendChild(divLightGreen);

    const navDivCenter = document.createElement("div");
    navDivCenter.classList.add("nav-div-center");
    divNavMain.appendChild(navDivCenter);

    const headerDivLeft = document.createElement("div");
    headerDivLeft.classList.add("header-div-left");
    navDivCenter.appendChild(headerDivLeft);

    const aLogoImg = document.createElement("a");
    aLogoImg.classList.add("a-logo-img");
    aLogoImg.href = "/";
    aLogoImg.onclick = (e) => {
        e.preventDefault();
        router.navigate("/")
    }
    headerDivLeft.appendChild(aLogoImg);

    const logoImg = document.createElement("img");
    logoImg.src = "../assets/images/logo-zabafood.svg";
    logoImg.classList.add("logo-img-header");
    aLogoImg.appendChild(logoImg);

    const divInputHeader = document.createElement("div");
    const divInput = inputEntry("O que você está procurando?", "text", "search-input", "none");
    divInput.id = "input-header";
    divInputHeader.appendChild(divInput);
    divInputHeader.classList.add("div-input-header");
    headerDivLeft.appendChild(divInputHeader);

    const buttonSearch = buttonGray("", "button-search", "onClick");
    const imgSearch = document.createElement("img");
    imgSearch.src = "../assets/images/search-icon.svg";
    imgSearch.id = "img-search";
    buttonSearch.appendChild(imgSearch);
    divInputHeader.appendChild(buttonSearch);

    // Pesquisa

    buttonSearch.addEventListener("click", async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById("search-input").value.trim();
        try {
            const searchURL = `/products/search/${encodeURIComponent(searchTerm)}`;
            window.location.href = searchURL;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error.message);
        }
    });

    const headerDivRight = document.createElement("div");
    headerDivRight.classList.add("header-div-right");
    navDivCenter.appendChild(headerDivRight);

    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-div");
    headerDivRight.appendChild(contactDiv);

    const aPhoneIcon = document.createElement("a");
    aPhoneIcon.classList.add("a-phone-icon");
    aPhoneIcon.href = "/contact"
    aPhoneIcon.onclick = (e) => {
        e.preventDefault();
        router.navigate("/contact")
    }
    contactDiv.appendChild(aPhoneIcon);

    const phoneIcon = document.createElement("img");
    phoneIcon.src = "../assets/images/phone-icon.svg";
    aPhoneIcon.appendChild(phoneIcon);

    const aContact = textA("ATENDIMENTO", "a-contact", "none", "/contact");
    aContact.onclick = (e) => {
        e.preventDefault();
        router.navigate("/contact")
    }
    contactDiv.appendChild(aContact);

    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account-div");
    headerDivRight.appendChild(accountDiv);

    const accountTextDiv = document.createElement("div");
    accountTextDiv.classList.add("account-text-div");

    const aAccountIcon = document.createElement("a");
    aAccountIcon.classList.add("a-account-icon");

    const accountIcon = document.createElement("img");
    accountIcon.src = "../assets/images/user-icon.svg";
    accountIcon.classList.add("a-account-icon");
    aAccountIcon.appendChild(accountIcon);

    try {
        const response = await fetch('/api/login', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (data.error) {
            const aAccount = textA("ENTRAR", "a-account", "none", "/login");
            aAccount.onclick = (e) => {
                e.preventDefault();
                router.navigate("/login")
            }
            accountDiv.appendChild(aAccountIcon);
            accountDiv.appendChild(aAccount);

            aAccountIcon.href = "/login"
            aAccountIcon.onclick = (e) => {
                e.preventDefault();
                router.navigate("/login")
            }
        } else {
            const aAccount = textA("MINHA CONTA", "a-account", "none", "/myaccount");
            aAccount.onclick = (e) => {
                e.preventDefault();
                router.navigate("/myaccount")
            }
            accountDiv.appendChild(aAccountIcon);
            accountDiv.appendChild(accountTextDiv);
            accountTextDiv.appendChild(aAccount);

            try{
                const accountData = await fetch(`/api/users/${data.user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const userData = await accountData.json();

                const creditBalance = document.createElement("p");
                creditBalance.classList.add("header-credit-balance");
                creditBalance.innerText = "Saldo: " + "R$ " + userData.credit_balance;
                accountTextDiv.appendChild(creditBalance);

                const roundedDivPlus = document.createElement("Div");
                roundedDivPlus.classList.add("header-rounded-plus-div");
                accountDiv.appendChild(roundedDivPlus);

                roundedDivPlus.addEventListener("click", () =>{
                    router.navigate("/payment");
                })

                const roundedDivText = document.createElement("span");
                roundedDivText.classList.add("header-rounded-text");
                roundedDivText.innerText = "+";
                roundedDivPlus.appendChild(roundedDivText);

            } catch(error){
                return;
            }
            
            aAccountIcon.href = "/myaccount"
            aAccountIcon.onclick = (e) => {
                e.preventDefault();
                router.navigate("/myaccount")
            }
        }
    } catch (error) {
        console.log(error);
    }

    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-div");
    headerDivRight.appendChild(cartDiv);

    const cartModal = await CartModal("flex");

    if (cartModal) {
        cartModal.style.display = "none";
        navDivCenter.appendChild(cartModal);

        cartDiv.addEventListener("mouseover", async () => {
            cartModal.style.display = "flex";
        })
        cartDiv.addEventListener("mouseleave", async () => {
            cartModal.style.display = "none";
        })
        cartModal.addEventListener("mouseover", async () => {
            cartModal.style.display = "flex";
        })
        cartModal.addEventListener("mouseleave", async () => {
            cartModal.style.display = "none";
        })
    }

    const aCartIcon = document.createElement("a");
    aCartIcon.classList.add("a-cart-icon");
    aCartIcon.href = cartModal ? "/cart" : "/login";
    aCartIcon.onclick = (e) => {
        e.preventDefault();
        const CartIconHref = aCartIcon.href.substring(aCartIcon.href.lastIndexOf("/"));
        router.navigate(CartIconHref);
    }
    cartDiv.appendChild(aCartIcon);

    const cartIcon = document.createElement("img");
    cartIcon.src = "../assets/images/cart-icon.svg";
    aCartIcon.appendChild(cartIcon);

    const getProductsQuantity = async () => {
        try {
            const userResponse = await fetch('/api/login', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const userData = await userResponse.json();

            const userId = userData.user.id;

            const cartProductsResponse = await fetch(`/api/cart_product/cart/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const cartProducts = await cartProductsResponse.json();

            const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);

            const cartQuantityDiv = document.createElement("div");
            cartQuantityDiv.classList.add("cart-quantity-div");
            if (totalQuantity !== 0) {
                cartDiv.appendChild(cartQuantityDiv);
            }

            const cartQuantityText = document.createElement("p");
            cartQuantityText.classList.add("cart-quantity-text");
            cartQuantityText.innerText = totalQuantity > 9 ? `9+` : totalQuantity;
            cartQuantityDiv.appendChild(cartQuantityText);
        } catch (error) {
            console.log(error);
        }
    }

    getProductsQuantity();

    window.addEventListener("productAdded", async () => {
        getProductsQuantity();
    })

    const navBarDiv = document.createElement("div");
    navBarDiv.classList.add("nav-bar-div");
    divNavMain.appendChild(navBarDiv)

    const productsMenuDiv = document.createElement("div");
    productsMenuDiv.classList.add("products-menu-div");
    productsMenuDiv.appendChild(textA("PRODUTOS", "products-menu", "none", "/products"));
    navBarDiv.appendChild(productsMenuDiv);
    productsMenuDiv.onclick = (e) => {
        e.preventDefault();
    }
    navBarDiv.appendChild(productsMenuDiv);

    const productsMenuArrow = document.createElement("img");
    productsMenuArrow.classList.add("products-menu-arrow");
    productsMenuArrow.src = "../assets/images/arrow-down.svg";
    productsMenuDiv.appendChild(productsMenuArrow);
    const modalCategory = await CategoryModal();
    modalCategory.style.display = "none";
    divNavMain.appendChild(modalCategory);


    productsMenuDiv.addEventListener("mouseover", async () => {
        modalCategory.style.display = "flex";
    })
    productsMenuDiv.addEventListener("mouseleave", async () => {
        modalCategory.style.display = "none";
    })
    modalCategory.addEventListener("mouseover", async () => {
        modalCategory.style.display = "flex";
    })
    modalCategory.addEventListener("mouseleave", async () => {
        modalCategory.style.display = "none";
    })


    const rightSideNavbarDiv = document.createElement("div");
    rightSideNavbarDiv.classList.add("right-side-navbar-div");
    navBarDiv.appendChild(rightSideNavbarDiv);

    const about = textA("QUEM SOMOS", "about-nav", "none", "/about");
    about.onclick = (e) => {
        e.preventDefault();
        router.navigate("/about")
    }
    rightSideNavbarDiv.appendChild(about);

    return divNavMain;
}
