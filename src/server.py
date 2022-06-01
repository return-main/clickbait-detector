from detect import predictor
from flask import Flask, jsonify, request
# from flask_caching import Cache
from os import environ

app = Flask(__name__)

# cache = Cache(config={
#     'CACHE_TYPE': 'FileSystemCache',
#     'CACHE_DIR': 'cache',
#     'CACHE_THRESHOLD': 100000,
# })
# cache.init_app(app)

@app.route("/detect", methods=["GET"])
# @cache.cached(timeout=50)
def detect():
    headline = request.args.get("headline", "")
    if headline == "":
        return "No headline", 422
    clickbaitiness = predictor.predict(headline)
    return jsonify({"clickbaitiness": round(clickbaitiness * 100, 2)})


if __name__ == "__main__":
    port = environ.get("PORT", 8000)
    app.run(host='0.0.0.0', port=port)
