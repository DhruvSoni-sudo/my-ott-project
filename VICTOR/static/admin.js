document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Admin panel script loaded!");

    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    const contentFrame = document.getElementById("content-frame");

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Default navigation ko disable karein

            // Active class update karein
            sidebarLinks.forEach((el) => el.parentElement.classList.remove("active"));
            link.parentElement.classList.add("active");

            // Agar logout hai, toh direct redirect karein
            if (link.href.includes("/logout")) {
                window.location.href = link.href;
                return;
            }

            // Iframe ke andar content load karein
            contentFrame.src = link.href;
        });
    });

    // Page reload hone ke baad last active tab wapas load karein
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
        const activeLink = document.querySelector(`.sidebar ul li a[href="${savedTab}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add("active");
            contentFrame.src = savedTab;
        }
    }
});
