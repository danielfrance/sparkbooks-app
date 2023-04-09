
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sparkbooks @yield('title')</title>
  <style>
  /* -------------------------------------
  GLOBAL RESETS
  ------------------------------------- */
    img {
	  border: none;
	  -ms-interpolation-mode: bicubic;
	  max-width: 100%;
	}

	body {
		background-color: #f6f6f6;
		font-family: Inter, sans-serif;
		-webkit-font-smoothing: antialiased;
		font-size: 14px;
		line-height: 1.4;
		margin: 0;
		padding: 0;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}

	table {
		border-collapse: separate;
		mso-table-lspace: 0pt;
		mso-table-rspace: 0pt;
		width: 100%;
	}

	table td {
		font-family: Inter, sans-serif;
		font-size: 14px;
		vertical-align: top;
	}

	/* -------------------------------------
		BODY & CONTAINER
	------------------------------------- */

	.body {
		background-color: #f6f6f6;
		width: 100%;
	}

	/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */

	.container {
		display: block;
		Margin: 0 auto !important;
		/* makes it centered */
		max-width: 996px;
		padding: 10px;
		width: 996px;
	}

	/* This should also be a block element, so that it will fill 100% of the .container */

	.content {
		box-sizing: border-box;
		display: block;
		Margin: 0 auto;
		max-width: 850px;
		padding: 10px;
	}

	/* -------------------------------------
		HEADER, FOOTER, MAIN
	------------------------------------- */

	.main {
		background: #ffffff;
		border-radius: 3px;
		width: 100%;
	}

	.wrapper {
		box-sizing: border-box;
		padding: 20px;
	}

	.content-block {
		padding-bottom: 10px;
		padding-top: 10px;
	}

	.footer {
		clear: both;
		Margin-top: 10px;
		text-align: center;
		width: 100%;
	}

	.footer td,
	.footer p,
	.footer span,
	.footer a {
		color: #999999;
		font-size: 12px;
		text-align: center;
	}

	/* -------------------------------------
		TYPOGRAPHY
	------------------------------------- */

	h1,
	h2,
	h3,
	h4 {
		color: #000000;
		font-family: Inter, sans-serif;
		font-weight: 400;
		line-height: 1.4;
		margin: 0;
		Margin-bottom: 30px;
	}

	h1 {
		font-size: 35px;
		font-weight: 300;
		text-align: center;
		text-transform: capitalize;
	}

	p,
	ul,
	ol {
		font-family: Inter, sans-serif;
		font-size: 14px;
		font-weight: normal;
		margin: 0;
		Margin-bottom: 15px;
	}

	p li,
	ul li,
	ol li {
		list-style-position: inside;
		margin-left: 5px;
	}

	a {
		color: #0488F0 !important;
		text-decoration: underline;
	}

    .small-text {
        font-size: 0.8rem;
    }

	/* -------------------------------------
		BUTTONS
	------------------------------------- */

	.btn {
		box-sizing: border-box;
		width: 100%;
	}

	.btn>tbody>tr>td {
		padding-bottom: 15px;
	}

	.btn table {
		width: auto;
	}

	.btn table td {
		background-color: #ffffff;
		border-radius: 5px;
		text-align: center;
	}

	.btn a {
		background-color: #ffffff;
		border: solid 1px #3498db;
		border-radius: 5px;
		box-sizing: border-box;
		color: #3498db;
		cursor: pointer;
		display: inline-block;
		font-size: 14px;
		font-weight: bold;
		margin: 0;
		padding: 12px 25px;
		text-decoration: none;
		text-transform: capitalize;
	}

	.btn-primary table td {
		background-color: #3498db;
	}

	.btn-primary a {
		background-color: #3498db;
		border-color: #3498db;
		color: #ffffff;
	}

	/* -------------------------------------
		OTHER STYLES THAT MIGHT BE USEFUL
	------------------------------------- */

	.last {
		margin-bottom: 0;
	}

	.first {
		margin-top: 0;
	}

	.align-center {
		text-align: center;
	}

	.align-right {
		text-align: right;
	}

	.align-left {
		text-align: left;
	}

	.clear {
		clear: both;
	}

	.mt0 {
		margin-top: 0;
	}

	.mb0 {
		margin-bottom: 0;
	}

    .mt10 {
        margin-top: 10px;
    }

    .mt20 {
        margin-top: 20px;
    }
    .word-wrap {
        word-wrap: break-word;
    }

    .gray {
        color: gray
    }
	.preheader {
		color: transparent;
		display: none;
		height: 0;
		max-height: 0;
		max-width: 0;
		opacity: 0;
		overflow: hidden;
		mso-hide: all;
		visibility: hidden;
		width: 0;
	}

	.powered-by a {
		text-decoration: none;
	}

	hr {
		border: 0;
		border-bottom: 1px solid #f6f6f6;
		Margin: 20px 0;
	}

	.flex-centered {
		display: flex;
		justify-content: center;
	}

	.register-link {
		text-decoration: none;
		background-color: #FF6F61;
		color: #fff !important;
		padding: 0.75rem;
		border-radius: 10px;
		font-weight: 700;
		font-size: 16px;
		margin-top: 20px;
	}

	/* -------------------------------------
		RESPONSIVE AND MOBILE FRIENDLY STYLES
	------------------------------------- */

	@media only screen and (max-width: 620px) {
		table[class=body] h1 {
			font-size: 28px !important;
			margin-bottom: 10px !important;
		}

		table[class=body] p,
		table[class=body] ul,
		table[class=body] ol,
		table[class=body] td,
		table[class=body] span,
		table[class=body] a {
			font-size: 16px !important;
		}

		table[class=body] .wrapper,
		table[class=body] .article {
			padding: 10px !important;
		}

		table[class=body] .content {
			padding: 0 !important;
		}

		table[class=body] .container {
			padding: 0 !important;
			width: 100% !important;
		}

		table[class=body] .main {
			border-left-width: 0 !important;
			border-radius: 0 !important;
			border-right-width: 0 !important;
		}

		table[class=body] .btn table {
			width: 100% !important;
		}

		table[class=body] .btn a {
			width: 100% !important;
		}

		table[class=body] .img-responsive {
			height: auto !important;
			max-width: 100% !important;
			width: auto !important;
		}
	}

	/* -------------------------------------
		PRESERVE THESE STYLES IN THE HEAD
	------------------------------------- */

	@media all {
		.ExternalClass {
			width: 100%;
		}

		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div {
			line-height: 100%;
		}

		.apple-link a {
			color: inherit !important;
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			text-decoration: none !important;
		}

		.btn-primary table td:hover {
			background-color: #34495e !important;
		}

		.btn-primary a:hover {
			background-color: #34495e !important;
			border-color: #34495e !important;
		}
	}
  </style>
</head>
<body>
    <div style="margin:0;padding:0;background-color:#f5f4f4">
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" id="m_-3091691181725823800bodyTable"
            style="border-collapse:collapse;table-layout:auto;margin:0;padding:0;background-color:#f5f4f4;height:100%;width:100%"
            width="100%">
            <tbody>
                <tr>
                    <td align="center" id="m_-3091691181725823800bodyCell"
                        style="border-collapse:collapse;table-layout:auto;margin:0;border-top:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:50px;height:100%;width:100%"
                        valign="top">

                        <div class="m_-3091691181725823800templateContainer"
                            style="background-color:#fff;border:30px solid #fff;border-radius:0;display:table;width:600px">
                            <div style="padding:0">


                                <table border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse:collapse;table-layout:fixed" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="border-collapse:collapse;table-layout:fixed"
                                                valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="m_-3091691181725823800templateRow"
                                                    style="border-collapse:collapse;table-layout:fixed" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td class="m_-3091691181725823800rowContainer m_-3091691181725823800kmFloatLeft"
                                                                style="border-collapse:collapse;table-layout:fixed"
                                                                valign="top">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    style="border-collapse:collapse;table-layout:fixed;min-width:100%"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="border-collapse:collapse;table-layout:fixed;padding:9px;padding-left:9;padding-right:9"
                                                                                valign="top">
                                                                                <table align="left" border="0"
                                                                                    cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse;table-layout:fixed;min-width:100%"
                                                                                    width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="m_-3091691181725823800kmImageContent"
                                                                                                style="border-collapse:collapse;table-layout:fixed;font-size:0;padding:0;padding-top:0;padding-bottom:0;padding-left:9px;padding-right:9px"
                                                                                                valign="top">
                                                                                                <a
                                                                                                    href="https://sparkbooks.io/login">
                                                                                                    
                                                                                                        <img src="{{ asset('sparkbooks-logo-blue.png') }}" alt="">
                                                                                                        SparkBooks
                                                                                                
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    style="border-collapse:collapse;table-layout:fixed"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style="border-collapse:collapse;table-layout:fixed;padding-top:16px">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    style="border-collapse:collapse;table-layout:fixed"
                                                                                    width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="border-collapse:collapse;table-layout:fixed">
                                                                                                <span></span></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    style="border-collapse:collapse;table-layout:fixed;min-width:100%"
                                                                    width="100%">

                                                                </table>

                                                                @yield('content')

                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    style="border-collapse:collapse;table-layout:fixed"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style="border-collapse:collapse;table-layout:fixed;padding-top:23px;padding-bottom:17px;padding-left:18px;padding-right:18px">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    style="border-collapse:collapse;table-layout:fixed;border-top-width:1px;border-top-style:solid;border-top-color:#ccc"
                                                                                    width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="border-collapse:collapse;table-layout:fixed">
                                                                                                <span></span></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
 
                                                                
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    style="border-collapse:collapse;table-layout:fixed"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="m_-3091691181725823800kmTextBlockInner"
                                                                                style="border-collapse:collapse;table-layout:fixed;background-color:#fff"
                                                                                valign="top">
                                                                                <table align="left" border="0"
                                                                                    cellpadding="0" cellspacing="0"
                                                                                    class="m_-3091691181725823800kmTextContentContainer"
                                                                                    style="border-collapse:collapse;table-layout:fixed"
                                                                                    width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="m_-3091691181725823800kmTextContent"
                                                                                                style="border-collapse:collapse;table-layout:fixed;color:#222;font-family:Helvetica Neue,Arial;font-size:13px;letter-spacing:0;line-height:1.5;max-width:100%;text-align:left;word-wrap:break-word;padding-top:5px;padding-bottom:0;padding-left:18px;padding-right:18px"
                                                                                                valign="top">
                                                                                                <table align="center"
                                                                                                    style="border-collapse:collapse;table-layout:fixed;max-width:580px"
                                                                                                    width="100%">
                                                                                                    <tbody>

                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-collapse:collapse;table-layout:fixed;padding-top:20px">
                                                                                                                <div
                                                                                                                    style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif;text-align:center">
                                                                                                                    <span
                                                                                                                        style="font-size:14px"><span
                                                                                                                            style="color:#696969">©
                                                                                                                            Sparkbooks.
                                                                                                                            2023</span></span>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div
                            style="display:none!important;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden">
                        </div>



                        <div class="m_-3091691181725823800templateContainer m_-3091691181725823800brandingContainer"
                            style="background-color:transparent;border:0;border-radius:0;display:table;width:600px">
                            <div style="padding:0">




                            </div>
                        </div>
                        <div
                            style="display:none!important;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden">
                        </div>


                    </td>
                </tr>
            </tbody>
        </table>
    </center>
</div>
</body>
</html>
