<template>
  <div style="margin: auto; display: flex; width: fit-content; padding: 10px">
    <div class="developer-div">
      <div class="banner"></div>
      <img
        class="avataar"
        src="../assets/images/sumit-avataar.jpeg"
        alt="Avatar"
      />
      <div class="full-name">Sumit Joshi</div>
      <div class="developer-information">
        <div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/github.png"
              alt=""
            />
            <div>
              <a href="https://github.com/SumitJoshii">SumitJoshii</a>
            </div>
          </div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/linkedin.png"
              alt=""
            />
            <div>
              <a href="https://www.linkedin.com/in/sumit-joshi1/"
                >sumit-joshi1</a
              >
            </div>
          </div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/twitter.png"
              alt=""
            />
            <div>
              <a href="https://x.com/Sumit_Joshi_">Sumit_Joshi_</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="developer-div">
      <div class="banner"></div>
      <img
        class="avataar"
        src="../assets/images/rahul-avataar.jpeg"
        alt="Avatar"
      />
      <div class="full-name">Rahul Yadav</div>
      <div class="developer-information">
        <div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/github.png"
              alt=""
            />
            <div>
              <a href="https://github.com/rahulyadev">rahulyadev</a>
            </div>
          </div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/linkedin.png"
              alt=""
            />
            <div>
              <a href="https://www.linkedin.com/in/rahulyadev/">rahulyadev</a>
            </div>
          </div>
          <div class="links">
            <img
              class="socials-icon"
              src="../assets/images/twitter.png"
              alt=""
            />
            <div>
              <a href="https://x.com/rahulyadevx">rahulyadevx</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.developer-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: 500px;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  background-color: rgb(0, 19, 52);
}

.developer-information {
  margin-top: 20px;
  padding: 10px;
}

.banner {
  margin-top: -10px;
  height: 100px;
  width: 305px;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    34deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
}

.full-name {
  color: beige;
  font-size: 22px;
  font-family: 'Courier New', Courier, monospace;
}

a {
  text-decoration: none;
  color: rgb(225, 240, 253);
  font-size: 18px;
}

a:hover {
  color: rgb(94, 179, 254);
}

.avataar {
  border-radius: 50%;
  height: 110px;
  width: 110px;
  margin-top: -25px; /* Adjust for slight overlap */
  position: relative;
  top: -40px; /* Adjust avatar's vertical position */
}

.avataar:hover {
  transform: scale(
    1.2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.links {
  display: flex;
  align-items: center;
}

.socials-icon {
  height: 50px;
  width: 50px;
  transition: transform 0.5s; /* Optional: smooth transition when animation ends */
}

/* Trigger shake animation on .socials-icon when hovering over the <a> link */
.links:hover .socials-icon {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
