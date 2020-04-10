echo "@Author Narandhran Thangavel"
echo "AppraamLabs Pvt Ltd, Bangalore."
cd "$(dirname $(dirname $(realpath $0)) )/"

# Error handler function
error_handler_function(){
	echo ""
	if test $? -eq 0; 
	then
        echo 'Execution success'
	else
        echo 'Execution failed'
        exit 1
	fi
}

check_null_function(){
	if [[ $1 = "" ]]
	then
		echo "Empty Strings are not allowed"
		exit 1;
	fi
}

echo "ENVIRONMENT SETUP"
echo ""
read -p "Enter the environment, production or development? : " env
check_null_function $env
if [[ $env = "production" ]] || [[ $env = "development" ]] || [[ $env = "local" ]]; then
cat <<EOF >.env
		NODE_ENV = $env
EOF
else
	echo "Sorry, wrong env"
	exit 1
fi
error_handler_function


echo ""
read -p "http or https? : " protocal
check_null_function $protocal
if [[ $protocal != "http" ]] && [[ $protocal != "https" ]]; then
	echo "You should've entered either http or https!!"
	exit 1
fi

echo ""
read  -p "Enter NODE server port: " nodePort
check_null_function $nodePort
validNumber='^[0-9]+$'
if ! [[ $nodePort =~ $validNumber ]]; then
    echo "error: Port should be a number"
    exit 1
fi

echo ""
echo "Type ip address without quote. Eg, 1.0.12.123 or localhost"
read -p "Enter Mongo host (ip/localhost): " mongoHost
check_null_function $mongoHost

echo ""
read -p "Enter Mongo Port : " mongoPort
check_null_function $mongoPort
if ! [[ $mongoPort =~ $validNumber ]]; then
    echo "error: Port should be a number"
    exit 1
fi

echo ""
read -p "Enter your database name : " dbName
check_null_function $dbName

echo ""
echo "Resource directory. Eg, get2basket-resources"
read -p "Enter base directory name: " dir
check_null_function $dir

echo ""
echo "http server ip. Eg, localhost or 1.0.12.123:8080"
read -p "Enter web server ip and port : " grp
check_null_function $grp

cat <<EOF >config.js
	const dotenv = require('dotenv').config();
	module.exports = {
    	name: 'API',
    	version: '1',
    	$env: {
    		SERVER_PORT: '$nodePort',
	        DB_NAME: '$dbName',
    	    DB_PORT: '$mongoPort',
        	DB_HOST: 'mongodb://$mongoHost',
        	GET_RESOURCE_BASE_PATH: '$protocal://$grp/$dir/',
        	POST_RESOURCE_BASE_PATH: '/var/www/html/$dir/'
    	}
    }
EOF
error_handler_function


## Initiation Directories
echo ""

echo "DIRECTORY CREATIONS"
if [ -d "/var/www/html/get2basket-resources" ]
then
    echo "directory(s) already exist";
else
    `sudo mkdir -p  -m 777 /var/www/html/get2basket-resources /var/www/html/get2basket-resources/dp /var/www/html/get2basket-resources/logs`
    `sudo mkdir -p 777 /var/www/html/get2basket-resources/product /var/www/html/get2basket-resources/category`
	echo "directory(s) created successfully";
fi
error_handler_function

## Install required package
echo ""

echo "INSTALLING NPM PACKAGES"
echo "Note: make sure you've NPM installed globally"
npm install pm2
npm install 
npm audit fix
error_handler_function

echo "1. Your configuration added under root of the project directory (config.js)"
echo "2. All necessary directories created under you http server. Make sure to run the server"
echo "3. necessary NPM packages installed under root of the project directory (node_modules)"
 