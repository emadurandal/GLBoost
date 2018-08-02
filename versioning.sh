bash ./VERSION-GEN

echo "" >> ./build/glboost.js
echo "(0,eval)('this').GLBoost.VERSION='"$(cat ./VERSION-FILE)" branch: "$(git symbolic-ref --short HEAD)"';" >> ./build/glboost.js

echo "" >> ./build/glboost.min.js
echo "(0,eval)('this').GLBoost.VERSION='"$(cat ./VERSION-FILE)" branch: "$(git symbolic-ref --short HEAD)"';" >> ./build/glboost.min.js

echo "built branch: "$(git symbolic-ref --short HEAD)

echo "branch: "$(git symbolic-ref --short HEAD) >> VERSION-FILE
echo $(shasum -a 256 ./build/glboost.js) >> VERSION-FILE
echo $(shasum -a 256 ./build/glboost.js) >> VERSION-FILE
echo $(shasum -a 256 ./build/glboost.min.js) >> VERSION-FILE
echo $(shasum -a 256 ./build/glboost.min.js.map) >> VERSION-FILE
