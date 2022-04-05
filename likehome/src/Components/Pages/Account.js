import React from 'react'
import './Account.css';
function Account() {
    return (
        <div>
            <div class="container">
                <div class="grid">
                    <div id="profile_picture">
                        <div id="pic_img">
                            <p> Picture </p>
                        </div>
                    </div>
                    <div class="description">
                        <h1 class = "text" id="welcome"> Welcome </h1>
                        <p class = "text" id="username" > Zeta </p>

                        <h2 class = "text" id="points">  You have xxx points. </h2>
                        <button type="button" id="redeem"> Redeem Now </button>
                    </div>
                </div>
            </div>
            <div class="slides">
                <div class="tab">
                    <button id ="info" class="tablink" onclick="openPage('News', this, 'green')" id="defaultOpen">Account Information</button>
                    <button id="reserve "class="tablink" onclick="openPage('Home', this, 'red')">Your Reservations</button>
                    <button id="save" class="tablink" onclick="openPage('Contact', this, 'blue')">Your Saved Places</button>
                </div>
                <div id="information" class="tabcontent">
                    <h3>Account Information</h3>
                    <p>Get in touch, or swing by for a cup of coffee.</p>
                </div>
                <div id="reservations" class="tabcontent">
                    <h3>Your Reservations</h3>
                    <p>Home is where the heart is..</p>
                </div>

                <div id="saved" class="tabcontent">
                    <h3>Your Saved Places</h3>
                    <p>Some news this fine day!</p>
                </div>
            </div>
        </div>
    );

    function openPage(pageName, elmnt, color) {
        // Hide all elements with class="tabcontent" by default */
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = "";
        }

        // Show the specific tab content
        document.getElementById(pageName).style.display = "block";

        // Add the specific color to the button used to open the tab content
        elmnt.style.backgroundColor = color;
      }

      // Get the element with id="defaultOpen" and click on it
      document.getElementById("defaultOpen").click();
}

export default Account;
