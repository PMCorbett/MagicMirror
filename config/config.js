/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
const {
	privateCalenders,
	metOffice,
} = require(`${__dirname}/../config/secrets`);

let config = {
	address: "localhost", // Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", // The URL path where MagicMirror is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, // Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", // HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", // HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar",
		},
		// {
		// 	module: "clock",
		// 	position: "top_right"
		// },
		{
			module: "MMM-CalendarExt2",
			updateInterval: 6000000,
			rotateInterval: 0,
			config: {
				calendars: [
					...privateCalenders,
					{
						url:
							"https://www.google.com/calendar/ical/en_gb.uk%23holiday%40group.v.calendar.google.com/public/basic.ics",
						name: "UK Holidays",
						className: "holiday",
					},
				],
				views: [
					{
						mode: "month",
						position: "top_bar",
						hideOverflow: false,
					},
				],
				scenes: [
					{
						name: "DEFAULT",
					},
				],
			},
		},

		{
			module: "MMM-Wallpaper",
			position: "fullscreen_below",
			config: {
				// See "Configuration options" for more information.
				source: "local:./backgrounds",
				slideInterval: 60 * 1000 * 10, // Change slides every x minutes
			},
		},
		{
			module: "MMM-Spotify",
			position: "bottom_left",
			config: {
				debug: false,
				style: "mini",
				control: "hidden",
				showVolumeLabel: false,
			},
		},
		{
			module: "weather",
			position: "bottom_right",
			config: {
				// See 'Configuration options' for more information.
				type: "forecast",
				weatherProvider: "ukmetoffice",
				apiBase:
					"http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/",
				apiKey: metOffice.apiKey,
				locationID: metOffice.locationID,
				showPrecipitationAmount: true,
				colored: true,
			},
		},
		{
		module: "newsfeed",
		position: "lower_third",	// This can be any of the regions. Best results in center regions.
		config: {
			// The config property is optional.
			// If no config is set, an example calendar is shown.
			// See 'Configuration options' for more information.

			feeds: [
				{
					title: "Braingle",
					url: "https://www.braingle.com/rss_teasers.php",
				},
			],
			showSourceTitle: false,
			showPublishDate: false,
			showDescription: true,
			truncDescription: false,
			maxNewsItems: 1,
			updateInterval: 50 * 60 * 1000,
		}
	}
	],
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}
