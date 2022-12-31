const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	// http://colorcode.is/ - helpful color site
	daisyui: {
		themes: [
			{
				// corporate adapted light
				btihenl: {
					primary: '#5aa867',
					secondary: '#0080bc',
					accent: '#f1db85',
					neutral: '#3a3a3a',
					'base-100': '#f0f8ff',
					'base-content': '#100f0f',
					info: '#0080bc',
					success: '#5aa867',
					warning: '#d29a2f',
					error: '#b53729',
					'code-bg-color': '#f1db85'
				},
				// business adapted darker
				btihend: {
					primary: '#5aa867',
					secondary: '#0080bc',
					accent: '#f1db85',
					neutral: '#23282E',
					'base-100': '#3a3a3a',
					info: '#0080bc',
					success: '#5aa867',
					warning: '#d29a2f',
					error: '#b53729',
					'code-bg-color': '#f1db85'
				}
			},
			'dracula'
		]
	},
	plugins: [require('daisyui')]
};

module.exports = config;
