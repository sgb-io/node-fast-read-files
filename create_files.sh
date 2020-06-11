for i in {0..250}
do
    cp sample.ts "files/File$(printf "%03d" "$i").ts"
done