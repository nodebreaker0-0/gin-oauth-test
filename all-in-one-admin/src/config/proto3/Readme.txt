1.install protoc 
http://google.github.io/proto-lens/installing-protoc.html

2.build js files from your proto file
https://github.com/grpc/grpc-web

protoc -I=. config.proto \
--js_out=import_style=commonjs:. \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

OR

you can just npm run proto-build