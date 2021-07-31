import React from "react";

export default function MainPage() {
  return (
    <>
      <div class="container">
        <div class="card">
          <div class="content">
            <div class="img" style="background-color: rgb(0, 0, 0)">
              <img src="/logo/voting_logo.png" alt="" />
            </div>
            <div class="contentBx">
              <h3>
                E-Voting.
                <br />
                <br />
                <span style="font-weight: bold; font-size: 15px">
                  मतदान आपका हक, गर्व से वोट दें |
                </span>
              </h3>
            </div>
          </div>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
      </div>

      {/* <!-- Site footer --> */}
      <footer class="foot">
        <div class="one">
          <div class="about">
            <h2>About Project</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              doloribus, aspernatur maiores sed nisi nihil in modi aperiam
              velit. Debitis quos provident accusamus tempore eum nulla magnam
              eveniet consequuntur iste sint explicabo dignissimos, molestiae
              aperiam libero nihil dolor nostrum harum modi sapiente! Obcaecati
              quod eius expedita dignissimos blanditiis nulla ad?
            </p>
          </div>
          <div class="quick">
            <h2>Quick-links</h2>
            <hr />
            <br />
            <h3>Contact-Us</h3>
            <h3>Repo-Link</h3>
            <h3>Gmail</h3>
            <h3>Reach-out-us</h3>
          </div>
        </div>
        <hr />
        <br />
        <div class="two">
          <div class="social">
            <i class="fab fa-instagram insta"></i>
            <i class="fab fa-facebook-square face"></i>
            <i class="fab fa-twitter twit"></i>
            <i class="fas fa-paper-plane gmail"></i>
          </div>
        </div>
      </footer>
    </>
  );
}
