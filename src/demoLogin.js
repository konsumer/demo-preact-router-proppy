// DO NOT USE THIS ON A REAL SITE
// this is a demo login, uses no server to make a fake JWT token
// normally, you would have a server return a token for a email/password

/* global btoa, TextEncoder */

export default (email, password) => {
  const user = {
    sub: '1234567890',
    name: 'John Doe',
    email,
    roles: ['DEV']
  }
  const token = createToken(user, 'ELZ99QBzWjrFyNIPu5cancZQ/j8WbRK8OwrckoUE7nyibzyLh1kHzckamu3VlN+egNL8DERMnHkG5BzJwSwG4Q==')
  return { user, token }
}

// https://gist.github.com/mattmazzola/1eafd7aea79e082982da203ec0405997

function createToken (payload, key) {
  var header = { typ: 'JWT', alg: 'HS256' }
  var segments = []
  segments.push(encodeURIComponent(btoa(JSON.stringify(header))))
  segments.push(encodeURIComponent(btoa(JSON.stringify(payload))))
  var footer = sign(segments.join('.'), key)
  segments.push(footer)
  return segments.join('.')
}

function sign (data, key) {
  window.crypto.subtle.importKey(
    'jwk', // can be "jwk" or "raw"
    { // this is an example jwk key, "raw" would be an ArrayBuffer
      kty: 'oct',
      k: key,
      alg: 'HS256',
      ext: true
    },
    { // this is the algorithm options
      name: 'HMAC',
      hash: { name: 'SHA-256' } // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      // length: 256, //optional, if you want your key length to differ from the hash function's block length
    },
    true, // whether the key is extractable (i.e. can be used in exportKey)
    ['sign', 'verify'] // can be any combination of "sign" and "verify"
  )
    .then(key => {
      var jsonString = JSON.stringify(data)
      var encodedData = new TextEncoder().encode(jsonString)

      return window.crypto.subtle.sign(
        {
          name: 'HMAC'
        },
        key, // from generateKey or importKey above
        encodedData // ArrayBuffer of data you want to sign
      )
    })
    .then(token => btoa(String.fromCharCode.apply(null, new Uint8Array(token))))
}
