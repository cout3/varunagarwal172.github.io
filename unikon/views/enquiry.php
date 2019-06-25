<!DOCTYPE html>
<html>
<head>
	<title>Unikon Fans</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="keywords" content="varun Agarwal">
    <link rel="shortcut icon" href="/unikon/img/favicon.ico" type="image/x-icon">

	<link rel="stylesheet" type="text/css" href="/unikon/style/bootstrap.css">
    <link rel="stylesheet/less" type="text/css" href="/unikon/style/style.less" />
    <script src="/unikon/script/less.min.js" ></script>
    
</head>
<body class="container-fluid no-padding-top-header">
    <?php include 'logo.php' ?>
    <div id="enquiry" class="section clearfix">
            <div>
                <div class="row">
                    <div class="col-md-offset-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="section-header">
                            <h2 class="section-heading">Send Enquiry</h2>
                            <p class="text-center">Please send us the equiry by filling the below form or contact us on <i class="glyphicon glyphicon-phone"></i>+91-9885330534</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">

                        <button type="button" id="sendEquiryModalBtn" class="btn btn-info btn-lg hide" data-toggle="modal" data-target="#sendEquiryFeedbackModal"></button>
                        <div class="modal fade" id="sendEquiryFeedbackModal" role="dialog">
                            <div class="modal-dialog">

                              <div class="modal-content">
                                <div class="modal-body">
                                  <p id="sendEquiryFeedbackMsg"></p>
                                </div>
                                <div class="modal-footer">
                                   <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                              </div>

                            </div>
                          </div>

                        <form id="send_enquiry" name="send_enquiry" method="post" role="form" class="contactForm" autocomplete="off">
                            <div class="form-group">
                                <input type="text" name="name" class="form-control" id="name" placeholder="Full Name" required/>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" name="email" id="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="email@domain.name"/>
                            </div>
                            <div class="form-group">
                                <input type="tel" class="form-control" name="phone" pattern="[0-9]{10}" placeholder="10 Digit Mobile Number" title="Enter 10 digit valid mobile number"
                                required>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject of Enquiry" />
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" name="message" id="message" rows="5" data-rule="required" placeholder="Message"></textarea>
                            </div>

                            <div class="text-center">
                                <button type="submit" id="sendEmail" class="btn btn-primary" disabled>Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

	<script type="text/javascript" src="/unikon/script/jquery-3.4.0.min.js"></script>
    <script type="text/javascript" src="/unikon/script/bootstrap.min.js"></script>
    <script type="text/javascript" src="/unikon/script/script.js"></script>
        
</body>
</html>