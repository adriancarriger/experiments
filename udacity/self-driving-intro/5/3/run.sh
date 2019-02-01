echo "Running not optimized"
(cd not_optimized && g++ -std=c++11 main.cpp blur.cpp initialize_beliefs.cpp move.cpp normalize.cpp print.cpp sense.cpp zeros.cpp && ./a.out)

echo ""
echo "Running optimized"
(cd optimized && g++ -std=c++11 main.cpp blur.cpp initialize_beliefs.cpp move.cpp normalize.cpp print.cpp sense.cpp zeros.cpp && ./a.out)
