docker run -ti --rm \
   -e DISPLAY=192.168.0.15:0 \
   -v /tmp/.X11-unix:/tmp/.X11-unix \
   firefox
