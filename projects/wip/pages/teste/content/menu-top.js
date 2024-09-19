document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('menuTop');

    const pageContent = `
       <header class="header-area header-sticky">
        <div class="container">
        <div class="row">
            <div class="col-12">
            <nav class="main-nav">
                <!-- ***** Logo Start ***** -->
                <a href="index.html" class="logo">Wild Ducks <em> Airsoft Team</em></a>
                <!-- ***** Logo End ***** -->
                
                <!-- ***** Menu Start ***** -->
                <ul class="nav">
                    <li class="scroll-to-section"><a href="#top">Home</a></li>
                    <li class="scroll-to-section"><a href="#features">Quem Somos</a></li>
                    <li class="scroll-to-section"><a href="#our-classes">Equipa</a></li>
                    <li class="scroll-to-section"><a href="#contact-us">Contacto</a></li>
                    <li class="scroll-to-section"><a href="#"></a></li>
                </ul>
                <a class='menu-trigger'> <span>Menu</span> </a>
                <!-- ***** Menu End ***** -->

            </nav>
            </div>
        </div>
        </div>
    </header>
    `;

    content.innerHTML = pageContent;
});