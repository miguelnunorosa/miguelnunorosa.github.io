document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('about');

    const pageContent = `
       <section class="section" id="features">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="section-heading">
            <h2>Quem <em>Somos</em></h2>
            <img src="../teste/assets/images/line-dec.png" alt="waves">
            <p>Somos uma equipa de Airsoft recém criada. Para além do termo "equipa" somos, acima de tudo, um grupo de
              amigos que gosta de se divertir e desfrutar de bons momentos.</p>
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="features-items">
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="First One">
              </div>
              <div class="right-content">
                <h4>Basic Fitness</h4>
                <p>Please do not re-distribute this template ZIP file on any template collection website. This is not
                  allowed.</p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="second one">
              </div>
              <div class="right-content">
                <h4>New Gym Training</h4>
                <p>If you wish to support TemplateMo website via PayPal, please feel free to contact us. We appreciate
                  it a lot.</p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="third gym training">
              </div>
              <div class="right-content">
                <h4>Basic Muscle Course</h4>
                <p>Credit goes to <a rel="nofollow" href="https://www.pexels.com" target="_blank">Pexels website</a> for
                  images and video background used in this HTML template.</p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul class="features-items">
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="fourth muscle">
              </div>
              <div class="right-content">
                <h4>Advanced Muscle Course</h4>
                <p>You may want to browse through <a rel="nofollow" href="https://templatemo.com/tag/digital-marketing"
                    target="_parent">Digital Marketing</a> or <a
                    href="https://templatemo.com/tag/corporate">Corporate</a> HTML CSS templates on our website.</p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="training fifth">
              </div>
              <div class="right-content">
                <h4>Yoga Training</h4>
                <p>This template is built on Bootstrap v4.3.1 framework. It is easy to adapt the columns and sections.
                </p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
            <li class="feature-item">
              <div class="left-icon">
                <img src="../teste/assets/images/features-first-icon.png" alt="gym training">
              </div>
              <div class="right-content">
                <h4>Body Building Course</h4>
                <p>Suspendisse fringilla et nisi et mattis. Curabitur sed finibus nisi. Integer nibh sapien, vehicula et
                  auctor.</p>
                <a href="#" class="text-button">Discover More</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
    `;

    content.innerHTML = pageContent;
});