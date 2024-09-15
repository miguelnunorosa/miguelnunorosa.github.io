document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('main-banner');

    const pageContent = `
        <div class="main-banner" id="top">
            <!--<video autoplay muted loop id="bg-video">
                <source src="assets/images/gym-video.mp4" type="video/mp4" />
            </video>-->
            <img src="./teste/assets/images/logo_team.png" id="logo-team-first-page">
        </div>
    `;

    content.innerHTML = pageContent;
});


