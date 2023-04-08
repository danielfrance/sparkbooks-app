@extends('emails.email_layout')
@section('title', 'Invitation to join SparkBooks')
@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed" width="100%">
        <tbody>
            <tr>
                <td class="m_-3091691181725823800kmTextBlockInner"
                    style="border-collapse:collapse;table-layout:fixed;background-color:#fff" valign="top">
                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                        class="m_-3091691181725823800kmTextContentContainer"
                        style="border-collapse:collapse;table-layout:fixed" width="100%">
                        <tbody>
                            <tr>
                                <td class="m_-3091691181725823800kmTextContent"
                                    style="border-collapse:collapse;table-layout:fixed;color:#222;font-family:Helvetica Neue,Arial;font-size:13px;letter-spacing:0;line-height:1.5;max-width:100%;text-align:left;word-wrap:break-word;padding-top:17px;padding-bottom:0;padding-left:18px;padding-right:18px"
                                    valign="top">
                                    <table align="center"
                                        style="border-collapse:collapse;table-layout:fixed;max-width:580px" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="border-collapse:collapse;table-layout:fixed">
                                                    <div
                                                        style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif">
                                                        <h3><strong>You've been invited to join {{$workspace->name}} on
                                                                Sparkbooks</strong></h3>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="border-collapse:collapse;table-layout:fixed">
                                                    <div
                                                        style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif">
                                                        <span style="font-size:14px"> Hi {{$invite->name}},</span>
                                                    </div>
                                                    <div
                                                        style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif">
                                                    </div>
                                                    <div
                                                        style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif">
                                                        <span style="font-size:14px"><br>Join your team on Sparkbooks and
                                                            get ready to enjoy your free time.</span>
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
    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed"
        width="100%">
        <tbody>
            <tr>
                <td class="m_-3091691181725823800kmTextBlockInner"
                    style="border-collapse:collapse;table-layout:fixed;background-color:#fff" valign="top">
                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                        class="m_-3091691181725823800kmTextContentContainer"
                        style="border-collapse:collapse;table-layout:fixed" width="100%">
                        <tbody>
                            <tr>
                                <td class="m_-3091691181725823800kmTextContent"
                                    style="border-collapse:collapse;table-layout:fixed;color:#222;font-family:Helvetica Neue,Arial;font-size:18px;letter-spacing:0;line-height:1.5;max-width:100%;text-align:left;word-wrap:break-word;padding-top:0;padding-bottom:0;padding-left:18px;padding-right:18px"
                                    valign="top">
                                    <table align="center"
                                        style="border-collapse:collapse;table-layout:fixed;max-width:580px" width="100%">
                                        <tbody>
                                            <tr>
                                            </tr>
                                            <tr>
                                                <td style="border-collapse:collapse;table-layout:fixed;padding-top:15px">
                                                    <div
                                                        style="font-family:Inter,Arial,Helvetica,sans-serif,open sans,century gothic,applegothic,sans-serif">
                                                        <strong><span style="font-size:16px"></span></strong>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            style="border-collapse:separate;table-layout:fixed;background-color:#4C51BF;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-radius:5px"
                                                            width="">
                                                            <tbody>
                                                                <tr style="color:#fff">
                                                                    
                                                                    <td align="center"
                                                                        style="border-collapse:collapse;table-layout:fixed;color:#fff;font-family:Helvetica Neue,Arial;font-size:16px;letter-spacing:0"
                                                                        valign="middle">
                                                                        <span style="font-size:14px">
                                                                            <a style="max-width:100%;color:#fff !important;font-family:Inter;font-size:18px;font-weight:normal;line-height:100%;text-align:center;text-decoration:none;word-wrap:break-word;display:inline-block;letter-spacing:0;padding-top:20px;padding-bottom:20px;padding-left:155px;padding-right:155px"
                                                                                title="" target="_blank"
                                                                                data-saferedirecturl=""
                                                                                href="{{env('APP_URL')}}/register/new-user-invite?token={{$invite->invite_token}}">Accept Invitation
                                                                            </a>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

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
@endsection
