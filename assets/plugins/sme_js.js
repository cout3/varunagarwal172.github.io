
	var myvar, entityID,entityCountCheck = false, entityName, otpKey="", callflag=0,pVKey='', reguFlag=0, geoLocation = "", searchLocation ="", locblurFlag=0, submitValid = 0,pagename;
// 	var service_domain = "http://services.etsmallbiz.economictimes.indiatimes.com";
// 	var service_domain_solar = "http://services.etsmallbiz.economictimes.indiatimes.com";
	var service_domain, service_domain_solar;
	if(window.location.host == "economictimes.indiatimes.com"){
        service_domain = "http://services.etsmallbiz.economictimes.indiatimes.com";
     	service_domain_solar = "http://services.etsmallbiz.economictimes.indiatimes.com";
    }
    else{
        service_domain = "http://servicesqa.etsmallbiz.economictimes.indiatimes.com";
    	service_domain_solar = "http://servicesqa.etsmallbiz.economictimes.indiatimes.com";
	    }
	var usersessionkey = "";
	var loginFbSts = "";
	var fbAutoLoginStatusProceed = false;
	var specialKeys = new Array();
	// User Data
	var _tp_data = {
		isLogged : false,
		email : false,
		city :  "",
		pic : null,
		thumb : null,
		fname : "",
		fullName : "",
		badge : "",
		points : 0,
		profile : "",
		uid : null,
		ssouid: null,
		portfolioUser : false
	};
	// Common stuffs will be there within ths variable
	var et = {
		dateFormat : function(sd) {
			var originalDate = sd;
			sd = sd.replace(/-/gi, '/');
			var timeStamp = "",
				cd = new Date();
	
			if (sd == "" || sd == null)
				return;
			sd = new Date(sd);
			if (cd.getTime() < sd.getTime())
				return;
			var chk = 0;
			var diff = Math.abs(cd.getTime() - sd.getTime());
			diff = ((diff / 1000) / 60);
			chk = diff % 60;
			if (diff <= 120) {
				if (diff < 60) {
					if (diff < 2) {
						timeStamp = parseInt(diff) + " Minute ago";
					} else {
						timeStamp = parseInt(diff) + " Minutes ago";
					}
				} else if (diff < 1440) {
					if (diff < 119) {
						timeStamp = Math.floor(diff / 60) + " Hour ago";
					} else {
						timeStamp = Math.floor(diff / 60) + " Hours ago";
					}
				} else if (diff <= 28800) {
					if (diff < 2880) {
						timeStamp = Math.floor(diff / (60 * 24)) + " Day ago";
					} else {
						timeStamp = Math.floor(diff / (60 * 24)) + " Days ago";
					}
				}
			} else {
				timeStamp = "";//originalDate;
			}
			return timeStamp;
		},
		getDecimalValue : function(pvalue){
			var value = parseFloat(pvalue);
			if (value > 9999999.99 || value < -9999999.99) {
				value = value / 10000000;
			} else if ((value > 99999.99 && value < 9999999.99) || (value > -9999999.99 && value < -99999.99)) {
				value = value / 100000;
			} else if ((value > 999.99 && value < 99999.99) || (value < -999.99 && value > -99999.99)) {
				value = value / 1000;
			} else if (value < 1000) {}
			if (value < 0) {
				value = -value;
			}
			return value;
		},
		getDecimalUnit : function (pvalue) {
			var value = parseFloat(pvalue);
			var format = " ";
			if (value > 9999999.99 || value < -9999999.99) {
				format = " Cr";
			} else if ((value > 99999.99 && value < 9999999.99) || (value > -9999999.99 && value < -99999.99)) {
				format = " Lac";
			} else if ((value > 999.99 && value < 99999.99) || (value < -999.99 && value > -99999.99)) {
				format = " K";
			} else if (value < 1000) {
				format = "";
			}
			return format;
		},
		addCommas : function(nStr) {
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			}
	}
	// et.mytUrl = document.location.port.length ? "http://mytest.indiatimes.com" : "http://myt.indiatimes.com";
	et.mytUrl = "http://myt.indiatimes.com";
	
	// <-- -------------suggestive search for location strats here ----------- -->
	var entityFlag=0, serviceFlag=0;
	var preSubmit ={
	    email  :[{
	        minlength : 2,
	        allowalpha:true
	    }],
	    
	};
	var enquiryValidation ={
	    validFlag :true,
	    name  :{
	        minLen : 2,
	        maxLen :75,
	        allowAlpha:true,
	        allowNum : false,
	        allowSpecial :false,
	        type:'name'
	    },
	    mobile  :{
	        minLen : 8,
	        maxLen :12,
	        allowAlpha:false,
	        allowNum : true,
	        allowSpecial :false,
	        type:'contact'
	        
	    },
	    email  :{
	        minLen : 8,
	        maxLen :50,
	        allowAlpha:true,
	        allowNum : true,
	        allowSpecial :false,
	        type:'email'
	    },
	    message  :{
	        minLen : 5,
	        maxLen :200,
	        allowAlpha:true,
	        allowNum : true,
	        allowSpecial :true,
	        type:'desc'
	    },
	    validate:function(inst){
	        if($(inst).val().length > enquiryValidation[$(inst).attr('data-name')].maxLen || $(inst).val().length < enquiryValidation[$(inst).attr('data-name')].minLen){
	            validFlag = false;
	            $(inst).focus();
	        }
	        if(enquiryValidation[$(inst).attr('data-name')].allowAlpha == true){
	            
	        }
	    }
	};
	objLoc = {
			service: service_domain_solar + '/smeapi/smesolrservices/searchcategory?rows=100',
			service2: service_domain_solar + '/smeapi/citysolr/getcities?responsetype=json',
			service3: service_domain_solar + '/smeapi/citysolr/getcities?responsetype=json',
			service4: service_domain_solar + '/smeapi/smesolrentity/searchbyname/mininal',
			searchData: [],
			cityData: [],
			cityOnlyData: [],
			topSearchData: [],
			scroll: 0,
			init: function (obj) {
				try {
					objLoc.bindLocationEvents(obj.textbox, obj.div, obj.service, obj.data, obj.service2, obj.service3, obj.service4);
					objLoc.preventEnter(obj.textbox);
				} catch (e) {
	
				}
			},
			isValid: function (tbs) {
			try {
			var valid = 0;
			switch(tbs){
			    case '.city':
				 $.each(objLoc['cityData'], function (i, v) {
    				if ($.trim($(tbs).val()) == $.trim(v['viewname']) && $.trim($(".state").val()) == v['viewsname']) {
    					valid = 1;
    				}
    			});
    			return valid;
				break;
				case '#city':
    				 $.each(objLoc['cityData'], function (i, v) {
    				if ($.trim($(tbs).val()) == $.trim(v['viewname']) && $.trim($("#state").val()) == v['viewsname']) {
    					valid = 1;
    				}
    			});
    			return valid;
				break;
				case '#location':
				 $.each(objLoc['cityOnlyData'], function (i, v) {
					if ($.trim($(tbs).val()) == $.trim(v['viewname'])) {
						valid = 1;
					}
				});
				return valid;
				break;
				case '#searchBox':
				 $.each(objLoc['topSearchData']['documentList'], function (i, v) {
					if ($.trim($(tbs).val()) == $.trim(v['entityname'])) {
						valid = 1;
					}
				});
				return valid;
				break;
				case '#add':
				 $.each(objLoc['searchData']['documentList'], function (i, v) {
					 var valid_data = v['servicename'] + ' in ' + v['parentservicename'];
				if ($.trim($(tbs).val()) == $.trim(valid_data)) {
					valid = 1;
				}
			});
			return valid;
			break;
				default:
				 case '#location':
				 $.each(objLoc['cityOnlyData'], function (i, v) {
				if ($.trim($(tbs).val()) == $.trim(v['viewname'])) {
					valid = 1;
				}
			});
			return valid;
				break;
				}
			} catch(e) {
					console.log('Error isValid', e);
				}
		   
		},
			//processResponse
			pr: function (data, tbs, sbs, service, data_var) {
				objLoc[data_var] = data;
				var li_count=0;
				switch(service){
						case 'service':
						 var html = '<ul>';
						$.each(data.documentList, function (i, v) {
					   html += '<li class="serviceTags" data-id="' + v['serviceid'] + '" data-parentid="' + v['parentserviceid'] + '" >' + v['servicename'] + ' in ' + v['parentservicename'] + '</li>';
						});
						html += '</ul>';
						break;
						case 'service2':
						    data.sort(SortByName);
						    var html = '<ul>';
    						$.each(data, function (i, v) {
    					        html += '<li class="cities" data-value="' + v['viewname'] + '" data-id="' + v['id'] + '" data-state="' + v['viewsname'] + '" data-cord="' + v['cord'] + '" >' + v['viewname'] + ' in ' + v['viewsname'] + '</li>';
    						});
    						html += '</ul>';
    						break;
						case 'service3':
						 data.sort(SortByName);
						 var html = '<ul>';
						$.each(data, function (i, v) {
					   html += '<li class="cities" data-value="' + v['viewname'] + '" data-id="' + v['id'] + '" data-state="' + v['viewsname'] + '" data-cord="' + v['cord'] + '" >' + v['viewname'] + ' in ' + v['viewsname'] + '</li>';
						});
						html += '</ul>';
						break;
						case 'service4':
						 searchLocation = geoLocation;
						 if($.trim($("#location").val()) != ""){
							searchLocation = $.trim($("#location").val());
						 }
						 else{
						 	searchLocation = geoLocation;
						 } 
						 entityFlag=0, serviceFlag=0;
						 var objhtml ={html1:"",html2:"",html3:"",html4:""},html="";
						 objhtml.html1 = '<div id="searchByName">Business</div>';
						$.each(data.documentList, function (i, v) {
							if(v['entityid'] != ""){
								entityFlag = 1;
								if(v['count'] > 1){
								    objhtml.html2 += '<li data-id="' + v['serviceid'] + '" ><a target="_self" href="/params/smesearchlist/category-' + v['entityseoname'] + '/location-'+searchLocation.replace(/\ /g,"-").replace(/\//g,"-").replace(/\\/g,"-")+'">' + v['entityname'] + '</a></li>';   
								}
								else{
								    objhtml.html2 += '<li data-id="' + v['entityid'] + '" ><a target="_self" href="/' + v['entityseoname'] + "/params/smecompany/entityid-" + v['entityid'] + '">' + v['entityname'] + '</a></li>';
								}
								 
							}
						});
						objhtml.html3 = '<div id="searchByService">Services</div>';
						$.each(data.documentList, function (i, v) {
							if(v['serviceid'] != ""){
								serviceFlag = 1;
								 objhtml.html4 += '<li data-id="' + v['serviceid'] + '" ><a target="_self" href="/params/smesearchlist/category-' + v['serviceseoname'] +'/serviceid-'+ v['serviceid'] + '/location-'+ searchLocation.replace(/\ /g,"-").replace(/\//g,"-").replace(/\\/g,"-") +'">' + v['servicename'] + '</a></li>';
							}
						});
						break;
						default:
						  var html = '<ul>';
						$.each(data, function (i, v) {
						 html += '<li class="cities" data-value="' + v['viewname'] + '" data-id="' + v['id'] + '" data-state="' + v['viewsname'] + '" data-cord="' + v['cord'] + '" >' + v['viewname'] + '</li>';
						});
						html += '</ul>';
						break;	
							}
				if($(sbs).attr('id') == "topSearchBy"){
					html="<ul>";
						if(entityFlag == 1){
							html += objhtml.html1;
						}
						html += objhtml.html2;
						if(serviceFlag == 1){
							html += objhtml.html3;
						}
						html += objhtml.html4;
						html +="</ul>";
					}
						$(sbs).html(html);
				if($(sbs + " ul li").length>=1){
					$(sbs).show();
					if($(sbs + " ul li").hasClass('cities')){
					    var objfirst = $(sbs + " ul li")[0];
					    $(tbs).attr('data-cord',$(objfirst).attr('data-cord'));
					    $(tbs).attr('data-id',$(objfirst).attr('data-id'));
					    $(tbs).attr('data-state',$(objfirst).attr('data-state'));
					    $(tbs).val().toLowerCase() == $(objfirst).attr('data-value').toLowerCase() ? $(tbs).val($(objfirst).attr('data-value')) :'' ;
					}
				}
				else{
					$(sbs).hide();
				}
				
				objLoc.bindLiClick(tbs,sbs);
				
			},
			xhr: 0,
			getData: function (str, tbs, sbs, service, data_var) {
				if (objLoc.xhr) {
					objLoc.xhr.abort();
				}
				if(tbs == '#add') {
					data = {servicename: str};
				}
				if(tbs == '#city' || tbs == '#location' || tbs == '.city') {
					data = {keyname: str};
				}
				if(tbs == "#searchBox" && $(tbs).val().length >=3){
				    var cordVal =JSON.parse(localStorage.getItem("session_loc_ses_val")).geocord;
					data = {keyname: str, entitylocation: searchLocation , geocordx: cordVal.split(",")[0],geocordy: cordVal.split(",")[1],distance: 25,georangesearch:true};
					objLoc.xhr = $.ajax({
						url: objLoc[service],
						data: data,
						dataType: 'jsonp',
						success: function (response) {
							objLoc.pr(response, tbs, sbs, service, data_var);
						}
					});
				}
				else if(tbs != "#searchBox"){
				    var cordVal =JSON.parse(localStorage.getItem("session_loc_ses_val")).geocord;
					objLoc.xhr = $.ajax({
						url: objLoc[service],
						data: data,
						dataType: 'jsonp',
						success: function (response) {
							objLoc.pr(response, tbs, sbs, service, data_var);
						}
					});
				}
			},
			preventEnter: function (tbs) {
				$(tbs).keydown(function (event) {
					if (event.keyCode == 13) {
					    if(tbs == "#searchBox"){
					        if($('#topSearchBy ul .active').length >0){
    							event.preventDefault();
    							if($.trim($('#topSearchBy ul .active a').attr('href'))){
    							    window.location.href = $('#topSearchBy ul .active a').attr('href');
    							}
    							return false;
    						} 
    						else{
                			    $('#searchButton').trigger('click');
    					    }
					    }
					}
				});
			},
			setValue:function(val, tbs, data) {
				$(tbs).val(val);
				if(typeof data == 'object') {
					$.each(data, function (i, v) {
						$(tbs).attr(i, v);
					});
				}
			},
			bindLiClick: function (tbs, sbs) {
				$(sbs + ' ul li').click(function (eve) {
				    //eve.preventDefault();
					if(sbs == '#serviceOptions') {
						var $this = $(this), data_id = $(this).attr('data-id'), data_parentid = $(this).attr('data-parentid'), data = {};
						data['data-id'] = data_id;
						data['data-parentid'] = data_parentid;
						objLoc.setValue($(this).text(), tbs, data);
					}
					if(sbs == '#topSearchBy') {
						var $this = $(this), data_id = $(this).attr('data-id'), data = {};
						data['data-id'] = data_id;
					}
					if(sbs == '#locationCityOptions') {
						var $this = $(this), data_value = $(this).attr('data-value'), data_id = $(this).attr('data-id'), data_state = $(this).attr('data-state'), data_cord = $(this).attr('data-cord'), data = {};
						data['data-id'] = data_id;
						data['data-state'] = data_state;
						data['data-cord'] = data_cord;
						objLoc.setValue(data_value, tbs, data);
					}
					if(sbs == '#citySearch') {
						var $this = $(this), data_value = $(this).attr('data-value'), data_id = $(this).attr('data-id'), data_state = $(this).attr('data-state'), data_cord = $(this).attr('data-cord'), data = {};
						data['data-id'] = data_id;
						data['data-state'] = data_state;
						data['data-cord'] = data_cord;
						$("#state").val(data_state);
						objLoc.setValue(data_value, tbs, data);
					}
					if(sbs == '.citySearch') {
						var $this = $(this), data_value = $(this).attr('data-value'), data_id = $(this).attr('data-id'), data_state = $(this).attr('data-state'), data_cord = $(this).attr('data-cord'), data = {};
						data['data-id'] = data_id;
						data['data-state'] = data_state;
						data['data-cord'] = data_cord;
						$(".state").val(data_state);
						$('.city').val(data_value);
                        $('.cityId').val(data_id);
						objLoc.setValue(data_value, tbs, data);
					}
					$(tbs).focus();
					$(sbs).hide();
				});
			},
			bindLocationEvents: function (tbs, sbs, service, data_var) {
				$(tbs).unbind('focus').unbind('blur').unbind('keyup');
				$(tbs).focus(function () {
					$(sbs).html('');
					if ($.trim($(this).val()) == $(this).attr('data-label')) {
						$(this).val('');
					}
					if(tbs == "#city"){
						$("#stateContainer").hide();
					}
					if(tbs == ".city"){
						$("#stateContainer").hide();
					}
				}).blur(function () {
					if ($.trim($(this).val()) == '') {
						$(this).val($(this).attr('data-label'));
					}
					if(!objLoc.isValid(tbs) && tbs != "#searchBox") {
							$(tbs).val('');
					}
					if(objLoc.isValid(tbs) ) {
						$(sbs).hide();
					}
				// 	if(tbs == "#city" && $.trim($(this).val()) != ''){
				// 		$("#stateContainer").show();
				// 	}
				// 	if(tbs == ".city" && $.trim($(this).val()) != ''){
				// 		$("#stateContainer").show();
				// 	}
					else{
						$("#stateContainer").hide();
					}
				 //objLoc.hideServiceOptions(sbs);
				}).keyup(function (e) {
					e.preventDefault();
					var txt = $(this).val();
					var key = (window.event) ? event.keyCode : e.keyCode;
								var selector = sbs + ' ul', objLi = $(selector + " > li");
					switch (key) {
						case 13:
						if(tbs == "#add"){
							var data_id = $(selector + " > li.active").attr('data-id'), data_parentid = $(selector + " > li.active").attr('data-parentid'), data = {};
							data['data-id'] = data_id;
							data['data-parentid'] = data_parentid;
							objLoc.setValue($(selector + " > li.active").text(), tbs, data);
						}
						if(tbs == "#searchBox"){
						    var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							objLoc.setValue(data_value, tbs, data);
							
						/*	var data_id = $(selector + " > li.active").attr('data-id'), data = {};
							data['data-id'] = data_id;*/
						}
						if(tbs == "#location"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$.cookie("geocord",data_cord, {domain:'indiatimes.com', path:'/'});
            				sme_loc_ses_object = {value: data_value, timestamp: new Date().getTime(), geocord: data_cord};
            				localStorage.setItem("session_loc_ses_val", JSON.stringify(sme_loc_ses_object));
							objLoc.setValue(data_value, tbs, data);
						}
						if(tbs == "#city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$("#state").val(data_state);
							objLoc.setValue(data_value, tbs, data);
						//	e.stopPropagation();
				// 			$("#stateContainer").show();
						}
						if(tbs == ".city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$(".state").val(data_state);
    						$('.city').val(data_value);
                            $('.cityId').val(data_id);
							objLoc.setValue(data_value, tbs, data);
				// 			$("#stateContainer").show();
				         //   e.stopPropagation();
						}
							$(sbs).hide();
							return false;
							break;
							// When Press Down Arrow
						case 40 :
							if (objLi.hasClass("active")) {
								if (objLi.last().hasClass('active')) {
									objLi.first().addClass('active').siblings().removeClass("active");
									objLoc.scroll = 0;
								} else {
								    if((objLi).parent().find('.active').next().is('li')){
    									(objLi).parent().find('.active').next().addClass('active').siblings().removeClass('active');
    									objLoc.scroll += $(selector + " > li.active").prev('li').outerHeight();
								    }
								    else{
								        (objLi).parent().find('.active').next().next().addClass('active').siblings().removeClass('active');
    									objLoc.scroll += $(selector + " > li.active").prev('li').outerHeight();
								    }
								}
							} else {
								objLi.eq(0).addClass("active");
								objLoc.scroll = 0;
							}
							if(tbs == "#add"){
							var data_id = $(selector + " > li.active").attr('data-id'), data_parentid = $(selector + " > li.active").attr('data-parentid'), data = {};
							data['data-id'] = data_id;
							data['data-parentid'] = data_parentid;
							objLoc.setValue($(selector + " > li.active").text(), tbs, data);
						}
						if(tbs == "#searchBox"){
							var data_id = $(selector + " > li.active").attr('data-id'), data = {};
							data['data-id'] = data_id;
						}
						if(tbs == "#location"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$.cookie("geocord",data_cord, {domain:'indiatimes.com', path:'/'});
            				sme_loc_ses_object = {value: data_value, timestamp: new Date().getTime(), geocord: data_cord};
            				localStorage.setItem("session_loc_ses_val", JSON.stringify(sme_loc_ses_object));
							objLoc.setValue(data_value, tbs, data);
						}
						if(tbs == "#city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$("#state").val(data_state);
							objLoc.setValue(data_value, tbs, data);
						}
						if(tbs == ".city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$(".state").val(data_state);
    						$('.city').val(data_value);
                            $('.cityId').val(data_id);
							objLoc.setValue(data_value, tbs, data);
						}
							$(sbs).scrollTop(objLoc.scroll);
							break;
							// When Press UP Arrow
						case 38 :
							if (objLi.hasClass("active")) {
								if (objLi.first().hasClass('active')) {
									objLi.last().addClass("active").siblings().removeClass("active");
									objLoc.scroll = $(selector).height() - $(selector + " > li.active").height();
								} else {
									(objLi).parent().find('.active').prev().addClass("active").siblings().removeClass("active");
									var b = $(selector + " > li.active").outerHeight() > $(selector + " > li.active").next().outerHeight() ? $(selector + " > li.active").outerHeight() : $(selector + " > li.active").next().outerHeight();
									objLoc.scroll = objLoc.scroll - b;
								}
							} else {
								objLi.last().addClass("active");
								objLoc.scroll = $(selector).height() - $(selector + " > li.active").height();
							}
							if(tbs == "#add"){
								var data_id = $(selector + " > li.active").attr('data-id'), data_parentid = $(selector + " > li.active").attr('data-parentid'), data = {};
								data['data-id'] = data_id;
								data['data-parentid'] = data_parentid;
								objLoc.setValue($(selector + " > li.active").text(), tbs, data);
							}
							if(tbs == "#searchBox"){
								var data_id = $(selector + " > li.active").attr('data-id'), data = {};
								data['data-id'] = data_id;
							}
						if(tbs == "#location"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$.cookie("geocord",data_cord, {domain:'indiatimes.com', path:'/'});
            				sme_loc_ses_object = {value: data_value, timestamp: new Date().getTime(), geocord: data_cord};
            				localStorage.setItem("session_loc_ses_val", JSON.stringify(sme_loc_ses_object));
							objLoc.setValue(data_value, tbs, data);
						}
						if(tbs == "#city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$("#state").val(data_state);
							objLoc.setValue(data_value, tbs, data);
						}
						if(tbs == ".city"){
							var data_value = $(selector + " > li.active").attr('data-value'), data_id = $(selector + " > li.active").attr('data-id'), data_state = $(selector + " > li.active").attr('data-state'), data_cord = $(selector + " > li.active").attr('data-cord'), data = {};;
							data['data-id'] = data_id;
							data['data-state'] = data_state;
							data['data-cord'] = data_cord;
							$(".state").val(data_state);
    						$('.city').val(data_value);
                            $('.cityId').val(data_id);
							objLoc.setValue(data_value, tbs, data);
						}
							$(sbs).scrollTop(objLoc.scroll);
							break;
						case 27:
							e.preventDefault();
							$(sbs).html('');
							$(sbs).hide();
							break;
						default:
							if (txt.length >= 1) {
								objLoc.scroll = 0;
								$(sbs).scrollTop(0);
								objLoc.getData(txt, tbs, sbs, service, data_var);
							}
							else{
								$(sbs).hide();
								}
							break;
					}
				});
			},
			hideServiceOptions: function(sbs){
				$(sbs).hide();
				}
		};
		
	var sme_ses_exp_object, dateTimeExp, now, sme_loc_ses, sme_loc_ses_object, loc_cord ;
    
    // restrict alphanumeric characters in input	
    function alpha(e) {
        var evt = e || window.event;
        var k = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || k == 9  || (k >= 48 && k <= 57) || k == 46);
    }	



    sso = {
        login: function () {
            window.open('https://jsso.indiatimes.com/sso/identity/login?channel=et','jsso','width=600,height=600');
        },
        signup: function () {
            window.open('https://jsso.indiatimes.com/sso/identity/login?channel=et','jsso','width=600,height=600');
        }
}


	var val = 0, text = '';
	var ownCompanyId = "";
	$(window).load(function(){
	    if(!localStorage.getItem("session_loc_ses_val")){
		    setGeolocation();
	    }
	    else if(JSON.parse(localStorage.getItem("session_loc_ses_val")).geocord == "0,0" || JSON.parse(localStorage.getItem("session_loc_ses_val")).geocord == "null,null"){
	        setGeolocation();
	    }
		//smeLoginCheck();
    	
    	if(_tp_data.isLogged){
    		$('#contactArea input[name="byuserssoname"]').val(_tp_data.fullName);
    		$('#contactArea input[name="phonenumber"]').val(_tp_data.mobile_no);
    		$('#contactArea input[name="email"]').val(_tp_data.email);
    	}
	   //prefill business enquiry form data if user is logged
	   objForm.prefillLoginData();
	
	});

	function smeLoginCheck(){
	    if(_tp_data.isLogged == true){
			$.ajax({
				   url: service_domain + "/smelisting/userdetail/json/userentities/" + _tp_data.ssouid ,
				   dataType:"jsonp",
				   success: function(data){     
				       // Entity dropdown menu
				       var  editProfile = '<li class="edit_profile"><a href="https://jsso.indiatimes.com/sso/identity/profile/edit?channel=et" target="_blank" class="edit">EDIT PROFILE</a></li>';
				       if(data.length > 0){
				           var menuList = '';
    				       $.each(data, function( index, value ) {
    				           var entName = value.entityname;
    				           if(entName.length > 0){
    				             // trim Entity name if long
        				           if(entName.length > 19) {
        				               
        				               entName = entName.substring(0, 16) + "...";
        				           }
                                  menuList += '<li><a href="/params/smecompany/entityid-'+ value.entityid +'/status-ownededit" data-eid="'+ value.entityid +'">'+ entName +'</a></li>';
    				           }
				            });
                            $("#signindetails").empty().append('Hi, ' + _tp_data.fname + ' <ul class="">'+ menuList + editProfile +'</ul>');
			                $("#signIn, #register").hide();
			                $("#signindetails, #logOut").show();
				       } else {
				           $("#signindetails").empty().append('Hi, ' + _tp_data.fname + ' <ul class=""><li><a href="/smeaddcompany.cms">No Entity Added</a></li>'+editProfile+'</ul>');
				         //  $("#signindetails").append('Hi, ' + _tp_data.fname + ' <ul class="">'+ menuList + editProfile +'</ul>');
			               $("#signIn, #register").hide();
			               $("#signindetails, #logOut").show();
				       }
				   }
			   });
    		if((window.location.href.indexOf('smehome') > -1 || window.location.href.indexOf('smelistings') > -1) && pagesourcet !='yes'){
		        $('#searchTab2').addClass('active').siblings().removeClass('active');
                $('#searchContent2').css('display','block').siblings().css('display','none');
                 objSearch.checkEntityCount();
            }
            else{
                if($('#searchTab1')){
                    $('#searchTab1').addClass('active').siblings().removeClass('active');
                    $('#searchContent1').css('display','block').siblings().css('display','none');
                }
            }	   
    			
		}
	}
	String.prototype.toTitleCase = function () {
    	return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
	function setGeolocation(){
		$.ajax({
			url: "http://etcards.economictimes.indiatimes.com/geolocation/geodetails/",
			dataType:"jsonp",
			success: function(data){
				geoLocation = $.trim(data.city).toTitleCase().replace(/\ /g,"-").replace(/\//g,"-").replace(/\\/g,"-");
				loc_cord = localStorage.getItem('clientlatitude')+','+localStorage.getItem('clientlongitude');
				$.cookie("geocord",loc_cord, {domain:'indiatimes.com', path:'/'});
				$("#location").val(geoLocation);
				$("#location").attr('data-cord',loc_cord);
				sme_loc_ses = geoLocation;
				sme_loc_ses_object = {value: sme_loc_ses, timestamp: new Date().getTime(), geocord: loc_cord};
				localStorage.setItem("session_loc_ses_val", JSON.stringify(sme_loc_ses_object));
			}					
		}).done(function(){
			updateUrls(0);
		});
	}
	function updateUrls(urlFlag){
	    var hosturl = window.location.protocol + "//" + window.location.host;
		$(".featureService, #relatedCategories ul li a, .categoryList li a").each(function(){
			var menuURL = $(this).attr('href');
			if(menuURL !=""){
    			var menuSubUrl = menuURL.split('params');
    			//console.log('menuSubUrl=',menuSubUrl);
    			if(urlFlag == 0){
    				menuURL = hosturl  + "/params" + menuSubUrl[1] + '/location-' + geoLocation;
    				//console.log('0.0----',menuSubUrl[0]);
    				//console.log("0.1----" + menuURL);
    				$(this).attr('href',menuURL);
    			}
    			else if(urlFlag == 1 && menuSubUrl !=""){
    				var temp = menuSubUrl[0].split('/');
    				if(menuSubUrl[1]){
    				    var menuSubSubUrl = menuSubUrl[1].split('/location-');
        				menuURL = hosturl + "/params" + menuSubSubUrl[0] + '/location-' + $.trim($("#location").val());
        				//console.log("1.1---" + menuSubUrl[0]);
        				//console.log("1.2----" + menuURL);
        				$(this).attr('href',menuURL);
    				}
    				
    			}
			}
		});
	}
	function categories(param){
    	$(param).next('ul').slideToggle();
	}
	function clearArea(){
		$( "#listingCompanyArea, #leftArea #relatedCategories ul" ).empty();
	}
	function activeToggle(param){
// 		$('#tabArea .tabs a').removeClass('active');
		$(param).addClass('active').siblings().removeClass('active');
	}
	function menuTopactive(param){
	  // if($(window).width() <=991){ 
    	    var a = $(param).parents(".menuTop").hasClass("activeMenu");
    		$(".menuTop").removeClass("activeMenu");
    		if(a == true){
    			$(param).parents(".menuTop").removeClass("activeMenu");
    			$(param).next().css('display','none');
    		}
    		else{
    			$(param).parents(".menuTop").addClass("activeMenu");
    			$(param).next().css('display','');
    		}
    //	   }
	}
	
	function successPhoneNumber(data){
        if(data.status == "success"){
            mobNo = $.trim($("#entitymobilenumbers").val());
            pVKey = data.key;
            $(".current_phone").text(mobNo);
          //  $("#phone").val(mobNo);
            $("#entitymobilenumbers,#saveEntityNumber").hide();
            $("#entitymobileotp,#entitymobileotpVerify").show();
            $("#entitymobileotpVerify").val("Verify");
            
            $('#phoneVerifyresendCode').addClass('disabled');
            $('.timer_wrap').removeClass('hide');
            $('#entitymobileotp').val('');
        }
    }
	$('.submit_wrap #sendDetails').on('click',function(){
	    var sibling = $('.sendEmail2').find('[data-pattern]');
	    var datafilled = 0;
	    for(var i=0; i<sibling.length;i++){
	        var attr = $(sibling[i]).attr("data-pattern");
	        if(!objForm.pattern[attr].test($(sibling[i]).val())){
	            $(sibling[i]).css('border','1px solid red');
	            $(sibling[i]).focus();
	            datafilled = 0;
	            return false;
	        }
	        else{
	            datafilled = 1;
	            $(sibling[i]).css('border-color','#ccc');
	        }
	    }
	    if(datafilled ==1){
	        entyPhone = $('.sendEmail2').find('[data-pattern="mobile"]').val();
	        $('.current_phone').html(entyPhone);
	        $('.sendEmail2').hide();
	        $('#fill_edit').html('');
            var infld1 = "<input type='hidden' name='entitymobilenumbers' value='" + entyPhone + "'/>";                    
            var infld2 = "<input type='hidden' name='callback' value='top.OTPverifymsg'/>";                               
            $('#fill_edit').html(infld1+infld2);
            var jsonData = service_domain + "/smelisting/messages/sendmessage/otp";
            $("#fill_edit").attr('action', jsonData);
            $("#fill_edit").submit(); 
	    }
	});
    $('.submit_wrap #sendEmail').on('click',function(){
        _this = $(this).parents("form")[0];
        var servicesVal='';
        if($(".sendEmail").attr("form-type") !='claim'){
            for(var cnt=0; cnt < $('.mutliSelect li input:checked').length; cnt++){
                var servs = $('.mutliSelect li input:checked')[cnt];
                servicesVal = servicesVal + $(servs).val()+ '|';
            }
            //servicesVal= $(_this).find('select option:selected').val();
        }
      //  $.each($(_this).find('select option:selected'),function(a,b){servicesVal = servicesVal +$(b).val()+ (a < $(_this).find('select option:selected').length -1 ?"|":"")})
        var mobVal =$.trim($(_this).find('input[data-mobile="mobile"]').val()),
            emailVal =$.trim($(_this).find('input[data-email="email"]').val()),
            ssoid = $.cookie('ssoid') != undefined ? $.cookie('ssoid') :'',
            byuserssoname =$.trim($(_this).find('input[data-name="name"]').val()),
            textmessage =$.trim($(_this).find('textarea[data-textarea="textarea"]').val()),
            entityMail = $(".contactArea[data-entityid='"+entityID+"']").attr("data-email"),
    		formtype = $(".sendEmail").attr("form-type"),
    		actionUrl = service_domain + '/smelisting/sendenquiry?entityid=' + entityID+'&ssoid='+ssoid+'&service='+servicesVal+'&username='+byuserssoname+'&usermailid='+emailVal+'&entitymailid='+entityMail+'&mobilenumber='+mobVal+'&formtype='+formtype+'&sendvia=MAIL&message='+textmessage;
		var patt = new RegExp("([A-Za-z0-9_\\-\\.])+\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})");
		var patt2 = new RegExp("(7|8|9)\\d{9}");
    	    	
	    if(!patt.test(emailVal)){
		    $(_this).find('.emptyFieldError').html("Enter valid email id.");
			$(_this).find('.emptyFieldError').show();
			return false;
		}
		else if(!patt2.test(mobVal) || isNaN(Number(mobVal)) || mobVal.length != 10){
		    $(_this).find('.emptyFieldError').html("Enter valid mobile number.");
    		$(_this).find('.emptyFieldError').show();
    		return false;
		}
		else if(byuserssoname == "" || textmessage == ""){
		    $(_this).find('.emptyFieldError').html("Name or message cannot be left empty.");
			$(_this).find('.emptyFieldError').show();
			return false;
		}
		else{
		    $(".emptyFieldError").html("");
		    $(_this).find('.emptyFieldError, .mobError, .emailError').hide();
			$(_this).attr('action', actionUrl);
		}
		
    });
    function OTPverifymsg(obj){   
        if(obj.status.toLowerCase() == "success"){
            pVKey = obj.key; 
            $('.sendEmailotp2').show();
            $('.sentEmail2').hide();
        }
    }
    function setEndUser(param){
        var param = $(param).parents("form")[0];
		var actionUrl = "", errorFlag=0;
		var mobVal = $.trim($(param).find('input[data-mobile="mobile"]').val()),
			emailVal = $.trim($('input[data-email="email"]').val()),
			byuserssoname = $.trim($(param).find('input[data-name="name"]').val()),
			textmessage = $.trim($(param).find('textarea[data-textarea="textarea"]').val()),
			entityMail = $(".contactArea[data-entityid='"+entityID+"']").attr("data-email"),
			formtype = $(".sendEmail").attr("form-type");
	    	actionUrl = service_domain + '/smelisting/sendenquiry?entityid=' + entityID+ '&username='+byuserssoname+'&usermailid='+emailVal+'&entitymailid='+entityMail+'&mobilenumber='+mobVal+'&formtype='+formtype+'&sendvia=MAIL&message='+textmessage;
		    if($(param).attr('name') == "emailSubmit"){
			if(!objForm.validate.email(emailVal)){
				$(param).find('.emptyFieldError').html("Enter valid email id.");
				$(param).find('.emptyFieldError').show();
				errorFlag = 0;
				return false;
			}
			else if(!objForm.validate.mobile(mobVal)){
			    $(param).find('.emptyFieldError').html("Enter valid mobile number.");
				$(param).find('.emptyFieldError').show();
				errorFlag = 0;
				return false;
			}
			else if(byuserssoname == "" || textmessage == ""){
				$(param).find('.emptyFieldError').html("Name or message cannot be left empty.");
				$(param).find('.emptyFieldError').show();
				errorFlag = 0;
				return false;
			}else{
			        $(param).find('.emptyFieldError, .mobError, .emailError').hide();
					//actionUrl = service_domain + '/smelisting/sendenquiry?entityid=' + entityID+ '&username='+byuserssoname+'&usermailid='+emailVal+'&entitymailid='+entityMail+'&mobilenumber='+mobVal+'&formtype='+formtype+'&sendvia=MAIL&message='+textmessage;
					errorFlag = 1;
			}
			
				
		}else if($(param).attr('name') == "callSubmit"){
			if(byuserssoname == "" || mobVal == ""){
				$(param).find('.emptyFieldError').html("Name and mobile number cannot be left empty.");
				$(param).find('.emptyFieldError').show();
				errorFlag = 0;
				return false;
			}
			else if(byuserssoname != "" && mobVal != ""){
				$(param).find('.emptyFieldError, .mobError, .emailError').hide();
					actionUrl = service_domain + '/smelisting/messages/sendmessage/email/' +  entityID;
					errorFlag = 1;
			}
		}
		if(errorFlag == 1 && !submitValid){
		    
		    $(".emptyFieldError").html("");
		    $(param).find('.emptyFieldError, .mobError, .emailError').hide();
			$(param).attr('action', actionUrl);
			errorFlag = 0;
			
			
		}
		$(".enlisterName").text(entityName);
    }
	function menuSilde(){
		if($("#topSideNav767").css("left")== '0px'){
			$("#topSideNav767").animate({left:'-235px'});
		}
	}
 	function formLoadSubmit(){}
 	function formHideSubmit(){}
	function showContact(param, formtype){
		var phone="",email="", headText="", labelText="";
		entityName = $.trim($(param).attr('data-name'));
		entityID = $(param).attr('data-entityid');
		var objSer =$(param).parent().parent().siblings('.row').find('.table-responsive li');
		var serValue = '';
		$(objSer).each(function(i) {
            serValue = serValue + $(objSer[i]).text() +",";
        });
		servVal = typeof $(param).attr('data-services') !="undefined" ? $(param).attr('data-services').split(",") : serValue.split(",");
		if($.trim($(param).attr('data-phone')) != ""){phone = "</h4><hr style='margin: 5px 0;'><p>address </p><p><b>+91-" + $.trim($(param).attr('data-phone')) + "</p></b>";}
		if($.trim($(param).attr('data-email')) != ""){email = "<p><b>" + $.trim($(param).attr('data-email'))+ "</p></b>";}
		var address = $.trim($(param).attr('data-address'));
		if(formtype !="claim"){
		    $('.serviceTag').show();
		    headText = 'Send Enquiry to "' + entityName+'"';
		    labelText="Enter your requirement";
		    $(".sendEmail").attr("form-type", "enquiry");
		}else{
		    $('.serviceTag').hide();
		    headText = 'Claim to "' + entityName+'"';
		    labelText = "Please provide supporting information";
		    $(".sendEmail").attr("form-type", "claim");
		}
		$(".sendEmail h4").text(headText);
		$(".message_label").text(labelText);
	//	if(typeof $(param).attr('data-services') !="undefined"){
		    $("#serviceOption").html('');
		    $(".mutliSelect ul").html('');
    		$(servVal).each(function(i) {
    		    if(servVal[i].length >0){
        		    $(".mutliSelect ul").append('<li><input type="checkbox" value="'+servVal[i]+'">'+servVal[i]+'</input></li>');
                    $("#serviceOption").append('<option value="'+servVal[i]+'">'+servVal[i]+'</option>');
    		    }
            });    
	//	}
		$('.emptyFieldError').hide();
		$("#blackoverlay, #contactArea, .sendEmail").show();
		$(".sentEmail, .sentClaim, .getCall, .verifyNumber, .verifyCall").hide();
	}
	function sendContact(param, formtype){
	    $(".sendEmail2").find('input[type="text"]').val("");
	    $(".sendEmail2").find('input[type="text"]').css('border-color','#ccc');
		$("#blackoverlay, #contactArea2, .sendEmail2").show();
	}

	function contactEntityDetailsClose(){
    	$("#blackoverlay, .contactEntityDetailsArea").hide();
	}
	function getUserNameFromCook() {
		var isLogged1 = '',
		loginFlag = false,
		usrnme = '';
		isLogged1 = $.cookie('MSCSAuth');
		if (valExists(isLogged1)) {
			var cookVal = $.cookie('MSCSAuthDetails');
			if (valExists(cookVal)) {
				usrnme = cookVal.split('=')[1];
			} else {
				cookVal = $.cookie('MSCSAuthDetail');
				if (valExists(cookVal)) {
					if (cookVal.indexOf('~') != -1) {
						var tempArr = cookVal.split('~');
						for (var x = 0; x < tempArr.length; x++) {
							if (tempArr[x].indexOf('Email') != -1) {
								usrnme = tempArr[x].replace('Email=', '');
								break;
							}
						}
					} else if (cookVal.indexOf('Email') != -1) {
						usrnme = cookVal.replace('Email=', '');
					}
				}
			}
		}
		if (isLogged1 != "" && isLogged1 != null) {
			loginFlag = true;
			if (usrnme.indexOf('@') == -1) {
				usrnme = usrnme.toLowerCase() + '@indiatimes.com';
			}
			
		}
		_tp_data.isLogged = loginFlag;
		_tp_data.email = usrnme.toLowerCase();
	}
	
	function setTopBar() {
		if ($.cookie("MSCSAuth") != null) {
			try {
				$("#loginWithFb,#topbardiv").hide();
				$("li.txt a", "header").first().text("My Times").attr({
					"href": "http://mytimes.indiatimes.com?channel=et",
					"target" : "_blank"
				}).attr('onclick','').unbind('click');
				
				$("li.txt a", "header").last().text("Log Out").attr({
					"onclick": "sso.logout()",
					"href" : "javascript:sso.logout()"
				});
				
				// Setting HTML
				var _html = "";
				
				_html = "<div class='flt'>";
					_html += "<a id='tp_image' href='http://mytimes.indiatimes.com?channel=et' target='_blank' />"; // Image
					_html += "<b> Hi, <a id='tp_name' href='http://mytimes.indiatimes.com?channel=et' target='_blank' /></b>"; // Name
				_html += "</div>";
				_html += "<div id='tp_badge'/><div class='sep' />"; // Badge + ToolTip for Badge Info
				_html += "<div id='myt_notifyCountBlk' onclick='getNotificationMYTPOP()'>0</div> "; // Notification Box
				_html += "<div class='clr' />"; // Log out
				
				$("#userDetails").html(_html);
				
				$(document).bind("mousedown", function (event) {
					if(event.target != $("#overlayL1")[0]){
						winCloseNotiFrame();
					}
				});
			
				$.getJSON(et.mytUrl + "/mytimes/profile/info/v1/?ssoid="+$.cookie('ssoid')+"&callback=?", function (data) {
			        if (data.F_N != null && data.F_N != undefined) {
					    _tp_data.fname = data.F_N;
					}
					_tp_data.pic = data.tiny;
					
					if (data.D_N_U != null && data.D_N_U != undefined) {
						_tp_data.profile = data.D_N_U;
					} else {
						_tp_data.profile = data._id;
					}
					
					_tp_data.uid = data._id;
					_tp_data.ssouid = data.uid;
					_tp_data.thumb = data.thumb;
					_tp_data.fullName = data.FL_N;
					_tp_data.city = data.CITY;
					_tp_data.mobile_no = typeof data.M_N != 'undefined' ? data.M_N : '';
					
					$("#tp_image").html("<img src='" + _tp_data.pic + "' alt='' />");
					$("#tp_name").text(_tp_data.fname).css({
						'min-width' : _tp_data.fname.length * 6 + 'px'
					});
					smeLoginCheck(); 
					
				});
			} catch (ex) {}
		}
	}
	function valExists(val) {
		var ret = false;
		if (val == null || val == '' || typeof val == 'undefined') {
			ret = false;
		} else {
			ret = true;
		}
		return ret;
	}
	/* closing notification iframe function */
	function winCloseNotiFrame() {
		if ($('#overlayL1').length) {
			$('#overlayL1').remove();
		}
	}
	sso.logout = function() {
		var sessionCookies = [
							"FBOOK_ID", "FBOOK_NAME", "FBOOK_EMAIL", "FBOOK_LOCATION", "FBOOK_IMAGE", 
							"TWEET_ID", "TWEET_NAME", "TWEET_LOCATION", "TWEET_IMAGE",
							"articleid", "txtmsg", "tflocation", "tfemail", "setfocus", "fbcheck", "twtcheck",
							"usercomt", "ifrmval", "frmbtm", "FaceBookEmail", "Fbimage", "Fboauthid", "Fbsecuritykey",
							"Twimage", "TwitterUserName", "Twoauthid", "Twsecuritykey"
							];
		$.each(sessionCookies, function(c, obj){
			$.removeCookie(obj, { path: '/', domain: '.indiatimes.com' });
		});
		
	//FB.logout(function (response) {});
		var tmpvar = "http://www.facebook.com/logout.php?app_key=6b01f688a268fc70a489a8b444b7d021&session_key=" + usersessionkey + "&next=" + escape(document.location.href);
		if (usersessionkey != "")
			$('#imgLogout').attr('src', tmpvar);
		setTimeout('meLogOut()', 2000);
	};
	
	function meLogOut() {
		var url;
		if(pagename == "smecmpedit"){
		    url=window.location.origin + "/params/smecompany/entityid-"+ getURLparameters('entityid');
		    window.location.replace('http://www1.economictimes.indiatimes.com/logout.cms?tfrout=' + url);
		}
		else{
	    	url=escape(document.location.href);
	    	document.location.href = "http://www1.economictimes.indiatimes.com/logout.cms?tfrout=" + url;
		}
	}
	// jQuery Cookie Plugin
	(function(factory){if(typeof define==='function'&&define.amd&&define.amd.jQuery){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function raw(s){return s;}
	function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}
	function converted(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
	return config.json?JSON.parse(s):s;}
	var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
	value=config.json?JSON.stringify(value):String(value);return(document.cookie=[encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
	var decode=config.raw?raw:decoded;var cookies=document.cookie.split('; ');var result=key?undefined:{};for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=decode(parts.join('='));if(key&&key===name){result=converted(cookie);break;}
	if(!key){result[name]=converted(cookie);}}
	return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==undefined){$.cookie(key,'',$.extend(options,{expires:-1}));return true;}
	return false;};}));
	
 	function successContact(data){
 		if(data.status == "success"){
 		    if(_tp_data.isLogged && data.count ==1){
 		        objPoints.add('act1827861');
 		       /* $(".sentEmail p").append('<p class="pointmsg">Congratulations, you have also earned 100 Times points!</p>');*/
 		    }
 		    else{
 		       /* $('.pointmsg').remove();*/
 		    }
 			$(".sendEmail").hide();
 			if($(".sendEmail").attr("form-type") !="claim"){
 			    $(".sentClaim").hide();
 			    $(".sentEmail").show();
 			}else{
 			    $(".sentEmail").hide();
 			    $(".sentClaim").show();
 			}
 			$("#emailText").val(""); 
 			$('.emptyFieldError').html("");
 		}
 		else{
 		    if(data.message.indexOf("abusive") > -1){
 		        
 		        $('#enquiry_form .emptyFieldError').html("<span class='abusive_icon newsprite'></span>"+data.message);
				$('#enquiry_form .emptyFieldError').show();
 		    }else{
 		        $(".errorMsg h3").text("Unable to process request, please try again after some time.");
     			$(".sendEmail").hide();
     			$("#emailText").val("");
     			$("#errorArea").css('display','inline-block');
 		    }
 		    
 		}
 	}
 	function getURLparameters(sParam){
	  	var sPageURL = $(location).attr('href').split('#');
		var sURLVariables = sPageURL[0].split('/params/');
		var result="";
		if(sURLVariables[1]){
			var sURLparameters = sURLVariables[1].split('/');
			pagename = sURLparameters[0];
			var len = sURLparameters.length;
			for (var i = 1; i < len; i++){
				var sParameterName = sURLparameters[i].split(/-(.+)?/);
				if (sParameterName[0] == sParam){
					if(sParameterName[1]){
						result = sParameterName[1].replace(/\-/g," ");
					}
				}
			}
			return result;
		}
	  }
	function roundNumber (value) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor((""+value).length/3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
        return shortValue+suffixes[suffixNum];
    }
	function successSMS(data){
		//$("html, body").animate({scrollTop: 0},'slow');
		if(data.status == "success"){
			if(callflag == 0){
				$(".getCall, .verifyCall, .verifyNumber").hide();
				$(".sentEmail").show();
				$("#mobno").val(""); 
			}
			else if(callflag == 1){
				otpKey = data.key;
				$(".getCall").hide();
				$(".verifyNumber h3").text("Hi " + _tp_data.fullName + " ! Verify your Mobile Number");
				$(".verifyNumber h4").text("Verification Code SMS has been sent to +91 - " + $("#mobno").val());
				$("#verifyNo").val("");
				$(".verifyNumber, .verifyCall").show();
			}
		}
		else{
			$("#contactArea").hide();
			$("#mobno").val("");
			$(".errorMsg h3").text("Unable to process request, please try again after some time.");
			$("#errorArea").css('display','inline-block');
		}
	}
	function successOTP(data){
		if(data.status == "success"){
			if(callflag == 1){
				otpKey = data.key;
				$(".verifyNumber").hide();
				$(".verifyNumber h4").text("Verification Code SMS has been sent to +91 - " + $("#mobno").val());
				$("#verifyNo").val("");
				$(".verifyNumberviaOTP").show();
			}else if(callflag == 0){
			    otpKey = data.key;
				$(".verifyNumber").hide();
				//$(".verifyNumber h4").text("Verification Code SMS has been sent to +91 - " + $("#mobno").val());
				//$("#verifyNo").val("");
				$(".verifyNumberviaOTP h3").text("");
				$(".verifyNumberviaOTP h4").text("Please enter the OTP which was sent to the email you provided");
				$(".verifyNumberviaOTP").show();
			}
		}
		else{
			$(".verifyNumber").hide();
			$(".errorMsg h3").text("Unable to process request, please try again after some time.");
			$("#errorArea").css('display','inline-block');
		}
	}






objPage = {
        init: function(){
            this.bindEvents();
            objSearch.init();
            objForm.init();
            objTopMenu.init();
            objPoints.init();
            tryGeolocation();
        },
        bindEvents: function(){
            // #topSideNav .topSubMenu .l1:hover ul li, #topSideNav .topSubMenu .l1:hover .more_nav{display:block;}
            $(".topSubMenu .l1 > a").click(function(e){
                if(!$(this).parent().hasClass("opened")){
                   e.preventDefault();
                }
                $(this).parent().siblings().removeClass("opened");
                $(this).parent().addClass("opened");
            });
        	$(".verifyEmail").click(function(){
                       	$.ajax({
                			url: service_domain + '/smelisting/entitystatus/contactadmin/json/'+ $("#entityuuid").val() + "?message=No thanks contact via email",
                			dataType:"jsonp",
                			success: function(data){
                			    $(".verifyNumber ").show();
                			    $("#statusClose,.verifyNumberviaOTP ").hide();
                				if(data.status == "success"){
                					$(".verifyNumber").html("<h3>We will get back to you</h3><a href='/smehome.cms'class='pull-right'>Go to SME Home</a>");
                				}else{
                					$(".verifyNumber").html("<h3>Incorrect verification code. Please recheck or RESEND Verification code</h3><a href='/smehome.cms'class='pull-right'>Go to SME Home</a>");
                				}
                			}
                		}); 
            });
            $("#verifyNumber").click(function(e) {
        		if($("#verifyMob").val().length <10){
        			$("#verifyMob").css('border','1px solid red');
        			$("#validMobileError").css({"display":"block"});
        		}else{
        			callflag = 1;
        			$("#verifyMob").css('border','1px solid #ccc');
        			$("#validMobileError").css({"display":"none"});
                	$("#mobileVerifySubmit").submit();
        		}
            });
            $("#statusClose").click(function(e) {
        	    $("#blackoverlay,#statusMainArea").hide();
            });
            $("#timespointdiv .closeButton").click(function(e) {
        	    $("#blackoverlay,#timespointdiv").hide();
            });
            $("#mobChecked").click(function(){
               if($("#mobChecked").is(':checked')){
                   $("#sendCall").attr('disabled',false);
               }
               else{
                   $("#sendCall").attr('disabled',true);
               }
           });
            $("#emailChecked").click(function(e){
                e.stopPropagation();
               if($("#emailChecked").is(':checked')){
                   $("#sendEmail").attr('disabled',false);
               }
               else{
                   $("#sendEmail").attr('disabled',true);
               }
           });
            $("#verifyOTP").click(function(e) {
        		var otp = $.trim($("#verifyNoOTP").val());
        		if(getURLparameters('via') != ""){
        		    	$.ajax({
            			url: service_domain + '/smelisting/messages/checkotp/' + otpKey + '?otp=' + otp,
            			dataType:"jsonp",
            			success: function(data){
            				if(data.status == "success"){
            				    if(data.message == "true"){
                					$("#statusClose,.verifyNumberviaOTP").hide();
                    				$(".newSSOMsgArea,#blackoverlay").show();
                    				$(".newSSOMsgArea h4").text(data.message);
            				    }else{
                					$("#verifyNoOTP").val("");
                					$("#notverifyOTP").css({'display':'block', 'color':'red'});
                					$("#notverifyOTP").text("Incorrect verification code. Please recheck or RESEND Verification code");
            				    }
            				}
            			}
            		});
        		}else{
            		$.ajax({
            			url: service_domain + '/smelisting/messages/checkotp/' + otpKey + '?otp=' + otp,
            			dataType:"jsonp",
            			success: function(data){
            				if(data.status == "success"){
            				     if(data.message == "true"){
                					$(".verifyNumberviaOTP").html("<h3>You successfully verified your number. We will get back to you</h3><a href='/smehome.cms'class='pull-right'>Go to SME Home</a>");
                					$("#statusClose").hide();
            				    }else{
                					$("#verifyNoOTP").val("");
                					$("#notverifyOTP").css({'display':'block', 'color':'red'});
                					$("#notverifyOTP").text("Incorrect verification code. Please recheck or RESEND Verification code");
            				    }
            				}
            			}
            		});
        		}
        	});
        	
        	$(document).click(function(e){
    		  var aria= $(".menuTop .dropdown-toggle").attr('aria-expanded');
    		  if(aria == "false"){
    		  $(".menuTop").removeClass("activeMenu");	
    		  }
    		  
    		  //if services list is open hide it
    		  if($(".search-list li").is(":visible") && !$(e.target).is('.searchServices, .searchServices *')){
    		      $(".search-list").html("");
    		  }
    		});
    		$("#contactClose").click(function(e) {
    			$("#blackoverlay, #contactArea").hide();
    			$("#emailText").val(""); 
    			$('#contactArea form').attr('action','javascript:void(0)');
    		});
    		$("#btnmsg").click(function(e) {
    			$(".contactStyle").hide();
    			$(".sendEmail, #backButton").show();
    		});
    		$("#btnCall").click(function(e) {
    			$(".contactStyle").hide();
    			if(_tp_data.mobile_no != ""){
    			$("#mobno").val(_tp_data.mobile_no);
    			}
    			$(".enlisterName").text(entityName);
    			$(".getCall, #backButton").show();
    		});
    		$("#verify").click(function(e) {
    			var actionUrl;
    			var otp = $.trim($("#verifyNo").val());
    			$.ajax({
    				url: service_domain + '/smelisting/messages/checkotp/' + otpKey + '?otp=' + otp,
    				dataType:"jsonp",
    				success: function(data){
    					if(otpKey == data.key){
    						actionUrl = service_domain + '/smelisting/messages/sendmessage/email/' +  entityID;
    						$('[name="callSubmit"]').attr('action', actionUrl);
    						$('[name="callSubmit"]').submit();
    						callflag = 0;
    					}else{
    						$("#verifyNo").val("");
    						$("#notverify").css({'display':'block', 'color':'red'});
    						$("#notverify").text("Verification Code does not match. Please try again.");
    					}
    				}
    			});
    		});
    		
    		// Dropdown
    		$("li#signindetails").hover(function(){
                    $(this).addClass("hover");
                    $('ul:first',this).css('display', 'block');
            
                }, function(){
                
                    $(this).removeClass("hover");
                    $('ul:first',this).css('display', 'none');
            
            });
            
            $("li#help").hover(function(){
                    $(this).addClass("hover");
                    $('ul:first',this).css('display', 'block');
            
                }, function(){
                
                    $(this).removeClass("hover");
                    $('ul:first',this).css('display', 'none');
            
            });
            
             $("#menuIcon").click(function(){
    				if($("#topSideNav767").css("left")== '0px'){
    				  $("#topSideNav767").animate({left:'-235px'});
    				}
    				else{
    				  $("#topSideNav767").animate({left:'0px'});
    				}
    		});
    		$("#errorClose").click(function(){
    			$("#blackoverlay, #errorArea").hide();
    		});
    		
    		$("#backButton").click(function(){
    			$("#blackoverlay, .contactStyle").show();
    			$(".sendEmail, .sentEmail, .getCall, .verifyNumber, #backButton").hide();
    			$('#contactArea form').attr('action','javascript:void(0)');
    		});
    		$("#topSideNav767").click(function(e) {
    			e.stopPropagation();
    		});
    		$('body').click(function(){
    			menuSilde();
    		});
    		
    		$("#contactArea .dropdown dt a").on('click', function() {
  $("#contactArea .dropdown dd ul").slideToggle('fast');
});

$("#contactArea .dropdown dd ul li a").on('click', function() {
  $("#contactArea .dropdown dd ul").hide();
});

        }
    }
    
// validation starts here

objForm = {
    isValid: false,
    init: function(){
        this.bindEvents();
        this.validateBeforeSubmit();
    },
    pattern: {
        name: /^[a-zA-Z]/i,
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        // email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        mobile: /^(\+91-|\+91|0)?(7|8|9)\d{9}/,
      //  mobile : /^[0-9]{10}$/,
        pin: /^[1-9][0-9]{5}$/,
        textarea: '',
        pan: /(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/,
        tan: /(^([a-zA-Z]{4})([0-9]{5})([a-zA-Z]{1})$)/,
        nonempty: /([^\s])/
        
    },
    validate: {
        email: function(email){
            var re = objForm.pattern.email;
            return re.test(email);
        },
        mobile: function(mobile){
            var regex = objForm.pattern.mobile;
            return regex.test(mobile);
        }
    },
    fields: {
      addErrorInput: function(el, err){
        // IE and FF Hack : blur return false
       /* $(el).removeClass('err');
        if($('input.err').length == 0) {
          $(el).addClass('err');
          $(el).focus();
          
          setTimeout(function () {
    		$(el).focus();
          }, 1);
          
        }
        
        $(el).siblings(err).show();
		submitValid = 1;
		return false;*/
      },
      removeErrorInput: function(el, err){
        $(el).removeClass('err');
		$(el).siblings(err).hide();
		submitValid = 0;
		return true;
      },
      isConditionTrue: function(c){
          
      }
      
    },
    prefillLoginData: function(){
        
        if(_tp_data.isLogged){
    		$('#enquiry_form input[data-name="name"]').val(_tp_data.fullName);
    		$('#enquiry_form input[data-email="email"]').val(_tp_data.email);
    	}
    },
    bindEvents: function(){
        
        
        $('input[data-name = "name"]').blur(function(e){

				var $this = $(this), rege = objForm.pattern.name;       //checking for valid name
				var valid = rege.test($(this).val());
				if(valid && $.trim($(this).val()) != "" && $(this).val().length > 2){
				    objForm.fields.removeErrorInput($this, '.nameError');
				}
				else{
					objForm.fields.addErrorInput($this, '.nameError');
					e.preventDefault ? e.preventDefault() : (event.returnValue = false);
					return false;
				}
		});
		$('textarea[data-textarea = "textarea"]').blur(function(e){
		    var $this = $(this);
		    if( $.trim($(this).val()) != "" && $(this).val().length > 4){
					objForm.fields.removeErrorInput($this, '.textareaError');
		    }else{
		        objForm.fields.addErrorInput($this, '.textareaError');
				e.preventDefault ? e.preventDefault() : (event.returnValue = false);
				return false;
		    }
		});
		$('input[data-email = "email"]').blur(function(e){
				var rege = objForm.pattern.email, $this = $(this);       //checking for valid email id
				var valid = rege.test($(this).val());
				if(!valid){
					objForm.fields.addErrorInput($this, '.emailError');
					e.preventDefault ? e.preventDefault() : (event.returnValue = false);
					return false;
				}
				else{
					objForm.fields.removeErrorInput($this, '.emailError');
				}
		});
		$('input[data-mobile = "mobile"]').blur(function(e){
			var rege = objForm.pattern.mobile, $this = $(this);
			var valid = rege.test($(this).val());
			if(!valid){
				objForm.fields.addErrorInput($this, '.mobError');
				e.preventDefault ? e.preventDefault() : (event.returnValue = false);
				return false;
			}
			else{
				objForm.fields.removeErrorInput($this, '.mobError');
			}
		});
		
	/*	var mobreg=$("input[data-mobile = 'mobile']");
		$(mobreg).bind("paste", function (e) {
			return false;
		});			
		$(mobreg).bind("drop", function (e) {
			return false;
		});*/
		$('input[data-pan = "pannumber"]').blur(function(){
				var rege = objForm.pattern.pan;       //checking for valid pan
				var valid = rege.test($(this).val());
				if((!valid) && ($.trim($(this).val()) != "")){
					$(this).siblings('.commonError').show();
					$(this).css({'border-color':'red'});
					
					$(this).focus();
					reguFlag = 1;
				}
				else{
					$(this).css({'border-color':'#ccc'});
					$(this).siblings('.commonError').hide();
					reguFlag = 0;
				}
		});
		$('input[data-tan = "tannumber"]').blur(function(){
				var rege = objForm.pattern.tan;       //checking for valid tan number
				var valid = rege.test($(this).val());
				if((!valid) && ($.trim($(this).val()) != "")){
					$(this).siblings('.commonError').show();
					$(this).css({'border-color':'red'});
					$(this).focus();
					reguFlag = 1;
				}
				else{
					$(this).css({'border-color':'#ccc'});
					$(this).siblings('.commonError').hide();
					reguFlag = 0;
				}
		});
        
        
        
        specialKeys.push(8); //Backspace
        specialKeys.push(118); // paste
        var num=$("input[data-number = 'number']");
		$(num).bind("keypress", function (e) {
			var keyCode = e.which ? e.which : e.keyCode
			var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
			return ret;
			});	
		/*$(num).bind("paste", function (e) {
			return false;
		});			
		$(num).bind("drop", function (e) {
					return false;
				});
	*/
	
		var alpha=$('input[data-alpha = "alpha"]');
    	$(alpha).bind("keyup", function (e) {
    		var keyCode = e.which ? e.which : e.keyCode
    		var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode == 8 || keyCode == 32 || keyCode == 190)
    		if($.trim($(this).attr('id')) == "gstNo"){
    			if($(this).val() != "" && ($(this).val().length <5 || $(this).val().length >15)){
    				$(this).siblings('.commonError').show();
    				$(this).css({'border-color':'red'});
    				$(this).focus();
    				reguFlag = 1;
    			}
    			else{
    				$(this).css({'border-color':'#ccc'});
    				$(this).siblings('.commonError').hide();
    				reguFlag = 0;
    			}
    		}
    		return ret;
    		});	
    	$(alpha).bind("paste", function (e) {
    		return false;
    	});			
    	$(alpha).bind("drop", function (e) {
    		return false;
				});
		$('input[name="entityregion"]').blur(function(){
		        if($.trim($(this).val()) == ""){
    		        $(this).siblings(".errorCity").show();
    		    }
    		    else{
    		        $(this).siblings(".errorCity").hide();
    		    }
		       
		});
		$('input[name="entityregion"]').focus(function(){
		    if($.trim($(this).val()) != ""){
		        $(this).siblings(".errorCity").hide();
    		}
		});
		$('input[data-regNo="regNo"]').blur(function(){
				var rege = /(^([a-zA-Z]{1})([0-9]{5})([a-zA-Z]{2})([0-9]{4})([a-zA-Z]{3})([0-9]{6})$)/;       //checking for valid reg number
				var valid = rege.test($(this).val());
				if((!valid) && ($.trim($(this).val()) != "")){
					$(this).siblings('.commonError').show();
					$(this).css({'border-color':'red'});
					$(this).focus();
					reguFlag = 1;
				}
				else{
					$(this).css({'border-color':'#ccc'});
					$(this).siblings('.commonError').hide();
					reguFlag = 0;
				}
		});
		$('input[data-serTaxNo="serTaxNo"]').blur(function(){
				var rege = /(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{3})([0-9]{3})$)/;       //checking for valid service tax number
				var valid = rege.test($(this).val());
				if((!valid) && ($.trim($(this).val()) != "")){
					$(this).siblings('.commonError').show();
					$(this).css({'border-color':'red'});
					$(this).focus();
					reguFlag = 1;
				}
				else{
					$(this).css({'border-color':'#ccc'});
					$(this).siblings('.commonError').hide();
					reguFlag = 0;
				}
		});
		$('input[data-alphanumeric="alphanumeric"]').blur(function(){
				var rege = /^[a-zA-Z0-9]+$/;       //checking for valid alphanumerics
				var valid = rege.test($(this).val());
				if((!valid) && ($.trim($(this).val()) != "")){
					$(this).siblings('.commonError').show();
					$(this).css({'border-color':'red'});
					$(this).focus();
					reguFlag =1;
				}
				else{
					$(this).css({'border-color':'#ccc'});
					$(this).siblings('.commonError').hide();
					reguFlag = 0;
				}
		});
		$('input[data-pin = "pincode"]').blur(function(e){
				if($(this).val().length < 6 && $(this).val().length != 0){
					$(this).css({'border-color':'red'});
					$(this).focus();
					reguFlag =1;
					e.stopPropagation();
				}
				else{
					$(this).css({'border-color':'#ccc'});
					reguFlag =0;
				}
		});
		$('input[data-email = "email"],input[data-serTaxNo="serTaxNo"], input[data-pan = "pannumber"], input[data-tan = "tannumber"], input[data-alpha = "alpha"], input[data-regNo="regNo"], input[data-alphanumeric="alphanumeric"]').keypress(function(event) {
			if (event.keyCode == 13) {
				event.preventDefault();
			}
		});
		
		$('#city, #state').keypress(function(event) {
			if (event.keyCode >= 48 && event.keyCode <= 57) {
				return false;
			}
		});
		$('#city, #state').bind("paste drop", function (e) {
					return false;
				});
				var splKeys =[8,37,38,39,40,46,86,9];
		$('.onlyNum').on('keydown',function(e){
		    if ( (e.which < 48 || e.which > 57) && ( splKeys.indexOf(e.which) == -1)) {
                e.preventDefault();
            }
		});
         $('.onlyChar').on('keydown',function(e){
		    if ((e.which < 32 || ( e.which > 32 && e.which < 65) || (e.which > 90 && e.which < 97) || e.which > 122) && (splKeys.indexOf(e.which) == -1) ) {
                e.preventDefault();
            }
		});  
    },
    validateBeforeSubmit: function(){
        
    }
    
    
};

objLocal = {
    keys: {
        rname: "",
        rcompany: "",
        rphone: "",  
        ssouid :""
    },
    init: function(){
        this.keys.rname = this.get("rname") ? this.get("rname") : "",
        this.keys.rcompany = this.get("rcompany") ? this.get("rcompany") : "",
        this.keys.rphone = this.get("rphone") ? this.get("rphone") : "",
        this.keys.ssouid = $.cookie("ssoid")? $.cookie("ssoid"): ""
    },
    get: function(key){
        if(typeof localStorage !="undefined"){
        return localStorage.getItem(key);}
    },
    set: function(key, val){
        if(typeof localStorage !="undefined"){
        localStorage.setItem(key, val);}
    },
    removeLocal: function(){
        if(typeof localStorage !="undefined"){
            $(Object.keys(objLocal.keys)).each(function(i, v){
                localStorage.setItem(v, "");
                objLocal.keys[v] = "";
            })            
        }
    }
}
objLocal.init();

objSearch = {
    init: function(){
        this.bindEvents();
    },
    bindEvents: function(){
        
        $("#searchContent2").keydown(function(e){
            var evt = e || window.event;
            var k = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
            if(k==13){
                $("#searchButton2").trigger("click");
            }
        });
        $(".searchTab").click(function(){
    		  //  window.location.href = '/smeaddcompany.cms';
    		  $(this).addClass("active").siblings().removeClass("active");
    		  if($(this).attr("id").indexOf(1) > 0){
    		    $("#searchContent1").show().siblings().hide();    
    		  }else{
    		      objSearch.checkEntityCount();
    		  }
    		  
    		});
    		
    		$('#searchButton2').click(function(){
    		    _this = $(this);
    		    var sibling = _this.siblings();
    		    var datafilled = 0;
    		    for(var i=0; i<sibling.length;i++){
    		        var attr = $(sibling[i]).attr("data-pattern");
    		        if(!objForm.pattern[attr].test($(sibling[i]).val())){
    		            $(sibling[i]).css('border','1px solid red');
    		            $(sibling[i]).focus();
    		            datafilled = 0;
    		            return false;
    		        }
    		        else{
    		            datafilled = 1;
    		            $(sibling[i]).css('border-color','transparent');
    		        }
    		    }
    		    if(datafilled ==1){
    		        objLocal.set("rname",$(sibling[0]).val());
    		        objLocal.set("rcompany",$(sibling[1]).val());
    		        objLocal.set("rphone",$(sibling[2]).val());
    		       window.location.href = '/smeaddcompany.cms';  
    		    }
    		});
    		
		$("#topSearch").submit(function(e){
			e.preventDefault();
			
			 var datafilled = 0, sibling = ["#searchBox", "#location"];
    		    for(var i=0; i<sibling.length;i++){
    		        var attr = $(sibling[i]).attr("data-pattern");
    		        if(!objForm.pattern[attr].test($(sibling[i]).val())){
    		            $(sibling[i]).css('border','1px solid red');
    		            $(sibling[i]).focus();
    		            datafilled = 0;
    		            return false;
    		        }
    		        else{
    		            datafilled = 1;
    		            $(sibling[i]).css('border-color','transparent');
    		        }
    		    }
    		    if(datafilled ==1){
    		        // do something if valid 
    		        
    		        window.location.href= "http://"+location.host+"/params/smesearchlist/category-" + $.trim($("#searchBox").val()).replace(/\ /g,"-").replace(/\//g,"-").replace(/\\/g,"-") + "/location-" + $.trim($("#location").val()).replace(/\ /g,"-").replace(/\//g,"-").replace(/\\/g,"-");
    		        
    		    }
    		    
    			
		 });
		$("#searchBox").blur(function() {
		      $("#topSearchNameService").slideUp(300);
		      //$('#topSearchBy').hide();
		  });

		$("#location").blur(function(e) {
    	    try{
    			if($.trim($(this).val()) != ""){
                	sme_loc_ses = $.trim($(this).val());
    				loc_cord = $.trim($(this).attr("data-cord"));
    				sme_loc_ses_object = {value: sme_loc_ses, timestamp: new Date().getTime(), geocord: loc_cord};
    				localStorage.setItem("session_loc_ses_val", JSON.stringify(sme_loc_ses_object));
    				$.cookie("geocord",loc_cord, {domain:'indiatimes.com', path:'/'});
    				updateUrls(1);
    			}else{
    				if(sme_ses_exp_object.value != ""){
    					$("#location").val(sme_ses_exp_object.value);
    					$(this).attr('data-cord',sme_loc_ses_object.geocord);
    				}else{
    					$("#location").val(geoLocation);
    				}
    			}
    	    }catch(e){console.log("error in location search blur", e)}
        });
    
    },
    checkEntityCount: function(){
        var count = 0;
        if(_tp_data.isLogged && _tp_data.ssouid){
            $.ajax({
                url:service_domain + "/smelisting/json/entitycount/" + _tp_data.ssouid,
                dataType: 'jsonp',
                success: function(data){
                    try{
                        if(data.status == "success" && data.count >= 2){
                            // prevent to register
                            $("#searchContent2").html("<h6 class='limit_message'>You are allowed to register only upto two companies with your Login ID. For more information please read the <a href='/smefaq.cms'>FAQs.</a></h6>");
                            
                        }
                        $("#searchContent2").show().siblings().hide();
                        if(data.count >= 2 && entityCountCheck == false && (window.location.href.indexOf('smehome') > -1 || window.location.href.indexOf('smelistings') > -1)){
                            entityCountCheck = true;  
                            $('#searchTab1').addClass('active').siblings().removeClass('active');
                            $('#searchContent1').css('display','block').siblings().css('display','none');
                        }
                    }catch(e){console.log("error in fetching user entity count");}
                }
          }); 
        }else{
            $("#searchContent2").show().siblings().hide();
        }
    }
}
    
objTopMenu = {
    init: function(){
        this.bindEvents();
    },
    bindEvents: function(){
        if($(window).width() >991){
             $(".menuTop").hover(function(e){
        		$(this).children(".topSubMenu").show();
        		$(this).addClass("activeMenu");
        	},
        	function(e){
            		$(this).children(".topSubMenu").hide();
            		$(this).removeClass("activeMenu");
        	    }
            );
        }
        if($(window).width() < 464){
           $.each($('#topSideNav > ul > li'), function(m,n){
               $(n).find('> a').html($(n).find('> a').html().replace(' Services<b class="caretNew sprite">','<b class="caretNew sprite">'));
           }) ;
        }
    }
}

objPoints = {
    data: {
        uid: '',
        uemail: '',
        aname: '',
        platform: 'web',
        txnId: new Date().getTime()
    },
    service: '/timespoints.cms',
    init: function () {
        var data = objPoints.data;
        data.uemail = _tp_data.email;
        data.uid = _tp_data.ssouid;
    },
    add: function (aname) {
        objPoints.data.aname = $.trim(aname);
        if(objPoints.data.uid != '' && objPoints.data.aname != '') {
            $.ajax({
                url: objPoints.service,
                method: 'POST',
                data: objPoints.data,
                success: function () {
                    console.log('times points response');
                }
            });
        }
    }
}
var apiGeolocationSuccess = function(position) {
    localStorage.setItem('clientlatitude', position.coords.latitude);
    localStorage.setItem('clientlongitude', position.coords.longitude);
    localStorage.setItem("geodynamicloc",'true');
	// alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var tryAPIGeolocation = function() {
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAh04gYk9d8VqgrMTlkzr5ZmlCRU6dCSeg", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
  //  alert("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
    localStorage.setItem('clientlatitude', position.coords.latitude);
    localStorage.setItem('clientlongitude', position.coords.longitude);
    localStorage.setItem("geodynamicloc",'true');
	//alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
    //  alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
    //  alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryGeolocation = function() {
  if (localStorage.getItem("geodynamicloc") == null  && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(   
    	browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
  }
};
function SortByName(x,y) {
  return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
}

$(document).ready(function(e) {
    $("#searchProv").click(function(){
         $("html, body").animate({scrollTop: 0},'slow');
         $('#searchTab1').addClass("active").siblings().removeClass("active");
		  if($('#searchTab1').attr("id").indexOf(1) > 0){
		    $("#searchContent1").show().siblings().hide();    
		  }else{
		      objSearch.checkEntityCount();
		  }
    });
    if($('#mainContentArea').length >0 && $(window).width() < 448){
        $(window).scrollTop($('#mainContentArea').offset().top);
    }
	if(localStorage.getItem("session_loc_ses_val")){
		sme_ses_exp_object = JSON.parse(localStorage.getItem("session_loc_ses_val")), dateTimeExp = sme_ses_exp_object.timestamp, now = new Date().getTime().toString();
		if((dateTimeExp + (24*60*60*1000)) < now){
			localStorage.removeItem('session_loc_ses_val');
		}
		else{
			$("#location").val(sme_ses_exp_object.value);
			$("#location").attr('data-cord',sme_ses_exp_object.geocord);
			loc_cord = sme_ses_exp_object.geocord
			//console.log("3."+loc_cord);
			$.cookie("geocord",loc_cord, {domain:'indiatimes.com', path:'/'});
			geoLocation = sme_ses_exp_object.value;
			updateUrls(1);
		}
	}
	getUserNameFromCook();
	if(_tp_data.isLogged == false){
	    if((window.location.href.indexOf('smehome') > -1 || window.location.href.indexOf('smelistings') > -1) && pagesourcet !='yes'){
	        $('#searchTab2').addClass('active').siblings().removeClass('active');
            $('#searchContent2').css('display','block').siblings().css('display','none');
        }
        else{
            if($('#searchTab1')){
                $('#searchTab1').addClass('active').siblings().removeClass('active');
                $('#searchContent1').css('display','block').siblings().css('display','none');
            }
        }
	}
/*	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    if (msie > 0) // If Internet Explorer, return version number
    {
        setTimeout(function(){ setTopBar(); }, 50000);
    }
    else{*/
	    setTopBar();
    /*}*/
	objLoc.init({'textbox': '#add', 'div': '#serviceOptions','service':'service','data':'searchData'});//services suggestive search service call
	objLoc.init({'textbox': '#city', 'div': '#citySearch','service':'service2','data':'cityData'});//location suggestive search service call
	objLoc.init({'textbox': '.city', 'div': '.citySearch','service':'service2','data':'cityData'});//location suggestive search service call
	objLoc.init({'textbox': '#location', 'div': '#locationCityOptions','service':'service3','data':'cityOnlyData'});//city only suggestive search service call
	objLoc.init({'textbox': '#searchBox', 'div': '#topSearchBy','service':'service4','data':'topSearchData'});//suggestive search for topsearch
	entityID = getURLparameters("entityid");
	objPage.init();
    
});	
    
        // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
        // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
        // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
        // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

	
	