# electricsquid.github.io - Doing something different
This site is an experiment about not using a generic website interface. Instead opting for a window interface. Also to be used for housing random projects that I feel like adding to it, That may or may not have a useful purpose.

## Use
If you are familiar with Linux or OSX you might recognize a few key elements of the site. It is largely based off the numix theme with a docky panel on xfce with linux.
### Panel
The panel comes with icons for each application, as well with status icons for each app. Showing if the app is currently open (Note: Closed, not minimized). With the larger being the application icon, and smaller the status.
### Windows
These windows act just like any other window based GUI. You can use the title bar to drag the window to your desired location. Use window buttons to minimize, maximize, and close the window. Focus certain windows by clicking on them. And resize the window (Note: Currently resizing is only available through the js console. See below for info).
#### Resizeing Windows
Currently resizing windows only works through the JavaScript console. This is because I can't figure out how to trigger the resizing event. The idea is to have your cursor near the corners or edges of the window to click and drag to resize. But as I stated before, I am not sure how to set this up.
You can resize using this syntax:
``` resize('appName',X size,Y size) ```  
With the current appName's being: ``` test ``` and ``` embed ```  
## Applications
The test application is currently just used for demonstrating the functionality of the window mechanics. So there isn't much point to opening it for anything other than that. But you can use the embed application to embed a website (if it allows embedding) or a youtube video. Youtube videos are officially supported by my embedding method. You can use the URLs in the Url bar. Or shorthand versions by right clicking the video and clicking "Copy video URL." EX:``` https://www.youtube.com/watch?v=dQw4w9WgXcQ  https://youtu.be/dQw4w9WgXcQ ```
