from http.server import BaseHTTPRequestHandler, HTTPServer
import time

hostName = "raspberrypi"
serverPort = 80

class MyServer(BaseHTTPRequestHandler):
	def do_GET(self):
		try:
			if self.path == '/':
				f = open('server/index.html', 'rb')
			else:
				f = open('server' + self.path, 'rb')
			self.send_response(200)
			self.send_header("Content-type", "text/html")
			self.end_headers()
			self.wfile.write(f.read())
			f.close()
		except FileNotFoundError:
			self.send_response(404)
		
		
if __name__ == "__main__":
	webServer = HTTPServer((hostName, serverPort), MyServer)
	print("Server started http://%s:%s" % (hostName, serverPort))
	
	try:
		webServer.serve_forever()
	except KeyboardInterrupt:
		pass
		
	webServer.server_close()
	print("Server stopped.")

