# output as png image
set terminal png

set output "./plots/Stream.png"

set title "Stream"

#nicer aspect ratio for image size
set size 1,0.7

# y-axis grid
set grid y

#x-axis label
set xlabel "request"

#y-axis label
set ylabel "response time (ms)"

plot "stream.data" using 9 smooth sbezier with lines title "something"