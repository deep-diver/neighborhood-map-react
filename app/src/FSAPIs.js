const api = "https://api.foursquare.com/v2"
const client_id = "GD1U0GHJVRDG1HNUQMPZVIA0GFPV2TSATLU5BEXQDBT4T2LM"
const client_secret = "PZXI0GPI45F00XFPDLHHSUN0EMFYZF4OWLW2FZA53IL2OWKR"
const version = "20180503"

export const search = (near) =>
  fetch(`${api}/venues/explore?near=${near}&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())

export const getPhoto = (venueId) =>
  fetch(`${api}/venues/${venueId}/photos?&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())
