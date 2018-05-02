Demo de streaming de vídeo com IPFS

# docker run -d --name ipfs-node -v /ipfs:/ipfs -v /tmp/ipfs-docker-staging:/export -v /tmp/ipfs-docker-data:/data/ipfs -p 8080:8080 -p 4001:4001 -p 127.0.0.1:5001:5001 jbenet/go-ipfs:latest

# mkdir /ipfs
# cd /ipfs
# git clone https://github.com/jonathanbaraldi/ipfs-demo.git
# docker exec -it ipfs-node /bin/sh
# cd /ipfs/ipfs-demo
# ipfs add -r site/

		added QmbtQffKgBtLQU1QTPXx8YojeUWL3vtExyvmpMgK1Bwwc5 site/lib/bootstrap.min.css
		added QmXMaSaanyLF7UQ5b74p18j1LZDkTrMCyJQKFJsAHSG1zU site/lib/font/vjs.eot
		added QmVprfEknr45ke7Tr29j9mvAag9sEm3fKbGeJY2cpLuCUa site/lib/font/vjs.svg
		added QmQVt3fftGoGfZPx9LQoKTkyjXaWLyCrhX8RQFe8XtqrHg site/lib/font/vjs.ttf
		added QmdZJjKF8Acimsjdd16cnHnF3GuMG4Qza6aPfw45685B28 site/lib/font/vjs.woff
		added QmdDBB3c2rm7UKdNwGfTPMqPm3QcqGQtTetfA7wrYRG3Fi site/lib/jquery.min.js
		added QmVZfEr18KXCYS8r1Hm9Hp1DFm9nCNGKfShSYrVWR2MQJ5 site/lib/video-js.css
		added QmSAB1rtZTtGz7F5vZz3EHwARcbgAiHY6nBgX3iZyPMCf3 site/lib/video.js
		added QmYX1rTh41HCLCp8srWkPgobppjH4pRjZU4fyGd6o5udWa site/play
		added QmSWoidZ63dj4abhr4PUV4PcXY4z9yaBW8a2DAa4kjGkhd site/lib/font
		added Qmc8Dh8Mg6UwxKGyVEGob9MVCVSRueQmyF4sxdLBxrZ6eD site/lib
		>>>>> added QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv site

		http://52.226.65.48:8080/ipfs/QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv

# ipfs add -r infinity-war/
	
		added QmVdxqcHVkDAejW9cS5C3HWLca8N3ZA5HQbiCJm7R4efKj infinity-war/video.mp4
		>>>>> added QmZ43LY6Gsu23G7khoJmXgYLjYgqa425JTUdNUfoDnVgzW infinity-war


Localmente

	http://52.226.65.48:8080/ipfs/QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv/play#/ipfs/QmZ43LY6Gsu23G7khoJmXgYLjYgqa425JTUdNUfoDnVgzW

Gateway

	https://gateway.ipfs.io/ipfs/QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv/play#/ipfs/QmZ43LY6Gsu23G7khoJmXgYLjYgqa425JTUdNUfoDnVgzW

	

# ipfs name publish QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv
	Published to <your peer ID>: <that hash>
	Published to QmWv8BvVmndFdE7Mft2jTnrz3CfPBrCErqighLasYJ1b8r: /ipfs/QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv

# ipfs name resolve <your peer ID>
# ipfs name resolve QmWv8BvVmndFdE7Mft2jTnrz3CfPBrCErqighLasYJ1b8r
					
	<that hash>
	/ipfs/QmYpVeRRpiHCCqQLw25fVAkk8hAQJy77Jw7g8BYu6Kuzkv

# https://ipfs.io/ipns/<your peer ID>
# https://ipfs.io/ipns/QmWv8BvVmndFdE7Mft2jTnrz3CfPBrCErqighLasYJ1b8r/

# https://ipfs.io/ipns/QmWv8BvVmndFdE7Mft2jTnrz3CfPBrCErqighLasYJ1b8r/play#/ipfs/QmZ43LY6Gsu23G7khoJmXgYLjYgqa425JTUdNUfoDnVgzW

# Colocar no DNS

	https://ipfs.io/ipns/QmWv8BvVmndFdE7Mft2jTnrz3CfPBrCErqighLasYJ1b8r
	/play




