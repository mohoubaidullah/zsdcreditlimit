var objVar = {
	RequestId: "",
	PayerId: "",
	WorkflowCycle: false,
	AllowChanges: true,
	noCheckforFileUpload: false,
	RequestType: ""
};
var validate = {
	customerContact: true,
	customerEmail: true,
	priceType: false,
	newCreditLimit: false,
	paymentTerm: false,
	customerType: false
};
var customerData = {};
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, FilterOperator, MessageToast, SimpleType, ValidateException,
	JSONModel) {
	"use strict";

	return Controller.extend("contract.zsdcreditlimit.controller.View1", {
		onInit: function () {
			this._wizard = this.byId("CreateCreditWizard");
			var oMessageManager, oView;
			if (window.sap.ushell && window.sap.ushell.Container) {
				objVar.currentUser = window.sap.ushell.Container.getUser().getId();
			}
			oView = this.getView();
			oMessageManager = sap.ui.getCore().getMessageManager();
			oView.setModel(oMessageManager.getMessageModel(), "message");
			var string = "";
			var complete_url = window.location.href;
			var onView = {};
			//var pieces = complete_url.split("?");
			//--------------------------------------------------------------------------------------
			// debugger;
			// //var uri = "https://bayan-stg.api.elm.sa/api/v1/carrier/trip/178403";
			// var uri = "https://www.google.com.sa";
			// var model = new JSONModel();
			//   var oHeaders = {
			//   	"app_id": "bb885d7a",
			//   	"app_key": "a0dd5f039a8b2ee9cba1a5e47b67b88f",
			//     "client_id": "677d5a20-601b-4dda-98e4-efaeab94fc30"
			//   };

			//   this.getView().setModel(model, "bball")
			//   model.loadData(uri, null, true, "GET", null, false, oHeaders);
			//   debugger;
			//--------------------------------------------------------------------------------------
			var pieces = complete_url.split("ccc");
			if (pieces.length > 1) {
				string = pieces[1];
				objVar.RequestID = string.substr(1, 10);
				objVar.WorkflowCycle = true;
				objVar.AllowChanges = false;
				onView = {
					idRequestId: false,
					idCustID: false,
					idCustType: false,
					idPriceType: false,
					idCreditLimit: false,
					idPayTerms: false,
					idfileUploaderVAT: false,
					idfileUploaderAgency: false,
					idfileUploaderBankStmt: false,
					idfileUploaderShopLicense: false,
					idfileUploaderCustomerId: false,
					idfileUploaderCR: false,
					idfileUploaderPromissory: false,
					idfileUploaderGuarantee: false,
					idfileUploaderCreditAccount: false,
					idfileUploaderAgingReport: false,
					idfileUploaderSEMAReport: false,
					idSpecialPriceTab: false,
					idFreeMontlyTab: false,
					idEditCredit: true,
					idfileVatBtn: true,
					idfileAgency: true,
					idfileBankStmt: true,
					idfileLicense: true,
					idfileID: true,
					idfileCR: true,
					idfilePromissory: true,
					idfileBankLetter: true,
					idfileCreditAcc: true,
					idfileAgingReport: true,
					idfileSEMAReport: true,
					idButtonUpload: false,
					idSaveTable: false,
					bpURL: "",
					generalMsg: "Please review customer details",
					creditDetailMsg: "Please review Credit details",
					docRequiredMsg: "Please review uploaded documents",
					budgetMsg: "Please review Budget Price details and Click on Digital Signature",
					docAgingMsg: "Please review Agining data",
					idPendingFrom: true,
					idCRNo: false,
					idVAT: false,
					idEmailId: false,
					idMobile: false,
					iCommentsBox: true,
					idCmComments: false,
					idCcComments: false,
					idVpsComments: false,
					idVpfComments: false,
					idCeoComments: false,
					idReqComments: false,
					ZbudgetPrice: true,
					ZspecialPrice_old: true,
					idRequestType: false,
					idCustomerGroup: false,
					idPromNoteExpDate: false,
					idPromNoteExpDate2: false,
					idPromNoteExpDate3: false,
					idPromNoteExpDate4: false,
					// vCustType: false,
					// vPriceType: false,
					required: {
						idRequestType: false,
						idCustType: false,
						idPriceType: false,
						idCreditLimit: false,
						idPayTerms: false
					},
					document: {}

				};
				this.getView().byId("idCredit").setNextStep(this.getView().byId("idAging"));
				var oModel = this.getView().getModel();

				var sPath = "/CreditLimitSet('" + objVar.RequestID + "')";
				var that = this;
				oModel.read(sPath, {
					success: function (oData, response) {
						customerData = oData;
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						objVar.PayerId = oData.PayerId;
						var bpURl = window.location.origin + "/fiori#Customer-manage&//C_BusinessPartnerCustomer(BusinessPartner='" + objVar.PayerId +
							"',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)";
						that.getView().getModel("localModel").setProperty("/bpURL", bpURl);
						var osf = that.getView().byId("SimpleFormChange354");
						var osf2 = that.getView().byId("SimpleFormChange351");
						if (oData.RequestId && oData.RequestId !== "") {
							that.getView().getModel("localModel").setProperty("/idRequestId", true);
							that.getView().byId("idRequestId").setText(oData.RequestId);
						}
						if (oData.PromNoteExpDate !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate", true);
						}
						if (oData.PromNoteExpDate2 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate2", true);
						}
						if (oData.PromNoteExpDate3 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate3", true);
						}
						if (oData.PromNoteExpDate4 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate4", true);
						}
						//Price Type
						// if (oData.RequestType === 'M' && oData.ZpricetypeNew === '2') {
						if (oData.RequestType === "M") {
							that.getView().getModel("localModel").setProperty("/idCustomerGroup", true);
						}
						if (oData.RequestType === 'M' && oData.ZpricetypeNew === '2') {
							that.getView().getModel("localModel").setProperty("/idSaveTable", true);

						} else {
							that.getView().getModel("localModel").setProperty("/idSaveTable", false);
						}
						that.getView().getModel("localModel").setProperty("/idSaveTableVis", true);
						// } else {
						// 	that.getView().getModel("localModel").setProperty("/idSaveTableVis", false);
						// }

						that.getView().byId("idRequestType").setSelectedKey(oData.RequestType);
						// that._wizard.validateStep(that.byId("idCustomerDet"));
						//Comments
						if (oData.CurrentApproval === 'CM') {
							that.getView().getModel("localModel").setProperty("/idCmComments", true);
							that.getView().byId("idCmComments").setValueState(sap.ui.core.ValueState.Error);
						} else if (oData.CurrentApproval === 'CC') {
							that.getView().getModel("localModel").setProperty("/idCcComments", true);
							that.getView().byId("idCcComments").setValueState(sap.ui.core.ValueState.Error);
						} else if (oData.CurrentApproval === 'VPS') {
							that.getView().getModel("localModel").setProperty("/idVpsComments", true);
						} else if (oData.CurrentApproval === 'VPF') {
							that.getView().getModel("localModel").setProperty("/idVpfComments", true);
						} else if (oData.CurrentApproval === 'CEO') {
							that.getView().getModel("localModel").setProperty("/idCeoComments", true);
						} else {
							that.getView().getModel("localModel").setProperty("/ZbudgetPrice", false);

						}
						// if (oData.CurrentApproval === "CEO") {

						that.getView().getModel("localModel").setProperty("/idEditCredit", true);
						that.getView().getModel("localModel").setProperty("/idSaveCredit", true);
						that.getView().getModel("localModel").setProperty("/idSpecialPriceTab", true);

						if (oData.RequestType === "M") {
							that.getView().getModel("localModel").setProperty("/idSaveTable", true);
						}
						// } else if (oData.CurrentApproval === 'CM' || oData.CurrentApproval === 'REQ') {
						that.getView().getModel("localModel").setProperty("/idEditCredit", true);

						that.getView().getModel("localModel").setProperty("/idfileUploaderVAT", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderAgency", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderBankStmt", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderShopLicense", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderCustomerId", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderCR", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderPromissory", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderGuarantee", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderCreditAccount", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderAgingReport", true);
						that.getView().getModel("localModel").setProperty("/idfileUploaderSEMAReport", true);

						that.getView().getModel("localModel").setProperty("/idButtonUpload", true);
						that.getView().getModel("localModel").setProperty("/idSpecialPriceTab", true);
						that.getView().getModel("localModel").setProperty("/idFreeMontlyTab", true);
						that.getView().getModel("localModel").setProperty("/idMobile", true);
						that.getView().getModel("localModel").setProperty("/idEmailId", true);
						that.getView().getModel("localModel").setProperty("/idVAT", true);
						that.getView().getModel("localModel").setProperty("/idCRNo", true);

						// that.getView().getModel("localModel").setProperty("/idSaveTable", true);

						objVar.AllowChanges = true;
						// var oModel = this.getOwnerComponent().getModel();

						// } else {
						// 	that.getView().getModel("localModel").setProperty("/idButtonUpload", false);
						// 	objVar.AllowChanges = false;
						// }
						that.getView().byId("CreateCreditWizard").setFinishButtonText("Digital Signature");
						that.getView().byId("idCustID").setValue(oData.PayerId);
						that.getView().byId("idPendingFrom").setText(oData.PendingFrom);
						osf.setModel(oModel3);
						osf2.setModel(oModel3);
						if (oData.RequestType === 'C') {
							var CustomerTypeNew = that.getView().byId("idCustType").getSelectedKey();

							sPath = "/UserMandDocSet(CurrentApproval='" + oData.CurrentApproval + "',ReqType='" + CustomerTypeNew + "',RequestId='" +
								objVar.RequestID + "')";
							oModel.read(sPath, {
								success: function (oData, response) {
									that.getView().getModel("localModel").setProperty("/document", oData);
									if ((oData.VAT || oData.LegAgcy || oData.BankStmt || oData.ShopLic || oData.CRNo || oData.CustId || oData.PromNote ||
											oData.BankGuar ||
											oData.CrdAccFaci || oData.Agining || oData.Simah) === '') {
										that._wizard.validateStep(that.byId("idAttach"));
									} else {
										that._wizard.invalidateStep(that.byId("idAttach"));

									}
									// var ocustomerTypeSet = new JSONModel();
									// ocustomerTypeSet.setData(oData);
									// this.getView().setModel(ocustomerTypeSet, "customerType");
									that.onChangeCustType("OnLoad");
								},
								error: function () {
									var data = {
										CurrentApproval: "REQ",
										ReqType: customerData.RequestType,
										ApprUser: false,
										VAT: false,
										LegAgcy: false,
										BankStmt: false,
										ShopLic: false,
										CRNo: false,
										CustId: false,
										PromNote: false,
										BankGuar: false,
										CrdAccFaci: false,
										Agining: false,
										Simah: false

									};

									that._wizard.validateStep(that.byId("idAttach"));
									that.getView().getModel("localModel").setProperty("/document", data);
									sap.m.MessageToast.show("No Data retreived");
									that.onChangeCustType("OnLoad");
								}
							});

						}
						// if (oData.ZpricetypeNew === '2') {
						//"//idSaveTableVis
						that.getView().getModel("localModel").setProperty("/idSaveTableVis", true);
						var myFilter = new sap.ui.model.Filter("RequestId", sap.ui.model.FilterOperator.EQ, (oData.RequestId));
						oModel.read("/itemsSet", {
							filters: [myFilter],
							success: function (oData1, response1) {
								var ocustomerTypeSet = new JSONModel();
								ocustomerTypeSet.setData(oData1);
								that.getView().setModel(ocustomerTypeSet, "materialList");
							}.bind(this),
							error: function () {
								sap.m.MessageToast.show("No Data retreived");
							}
						});
						// }
					},
					error: function () {
						that.getView().getModel("localModel").setProperty("/SubmitRequestVisible", false);
						sap.m.MessageToast.show("No Data retreived");
					}
				});
				sPath = "/CommentsSet('" + objVar.RequestID + "')";
				var osf = that.getView().byId("idCommentsAll");
				oModel.read(sPath, {
					success: function (oDataComments, response) {
						var oModel1 = new sap.ui.model.json.JSONModel(oDataComments);
						osf.setModel(oModel1);
						objVar.Comments = oDataComments;
						if (objVar.Comments && objVar.Comments.idCmComments !== "") {
							that.getView().byId("idCmComments").setValueState(sap.ui.core.ValueState.None);
						} else if (objVar.Comments && objVar.Comments.idCcComments !== "") {
							that.getView().byId("idCcComments").setValueState(sap.ui.core.ValueState.None);
						}
						//that._wizard.validateStep(that.byId("idCredit"));
					},
					error: function (oError) {}
				});

			} else {
				onView = {
					idRequestId: false,
					idCustID: false,
					idCustType: true,
					idPriceType: true,
					idCreditLimit: true,
					idPayTerms: true,
					idfileUploaderVAT: true,
					idfileUploaderAgency: true,
					idfileUploaderBankStmt: true,
					idfileUploaderShopLicense: true,
					idfileUploaderCustomerId: true,
					idfileUploaderCR: true,
					idfileUploaderPromissory: true,
					idfileUploaderGuarantee: true,
					idfileUploaderCreditAccount: true,
					idfileUploaderAgingReport: true,
					idfileUploaderSEMAReport: true,
					idSpecialPriceTab: true,
					idFreeMontlyTab: true,
					idEditCredit: false,
					idfileVatBtn: false,
					idfileAgency: false,
					idfileBankStmt: false,
					idfileLicense: false,
					idfileID: false,
					idfileCR: false,
					idfilePromissory: false,
					idfileBankLetter: false,
					idfileCreditAcc: false,
					idfileAgingReport: false,
					idfileSEMAReport: false,
					idButtonUpload: true,
					idSaveTable: false,
					bpURL: "",
					generalMsg: "Please enter all the mandatory customer details",
					creditDetailMsg: "Please enter Credit details",
					docRequiredMsg: "Please upload all the required mandatory documents",
					budgetMsg: "Please enter Budget Price details",
					docAgingMsg: "Please review Agining data",
					idPendingFrom: false,
					idCRNo: true,
					idVAT: true,
					idEmailId: true,
					idMobile: true,
					iCommentsBox: true,
					idCmComments: false,
					idCcComments: false,
					idVpsComments: false,
					idVpfComments: false,
					idCeoComments: false,
					idReqComments: true,
					ZbudgetPrice: false,
					ZspecialPrice_old: false,
					idRequestType: true,
					idCustomerGroup: false,
					idPromNoteExpDate: false,
					idPromNoteExpDate2: false,
					idPromNoteExpDate3: false,
					idPromNoteExpDate4: false,
					// vCustType: false,
					// vPriceType: false,
					// vPayTerms
					required: {
						idRequestType: false,
						idCustType: false,
						idPriceType: false,
						idCreditLimit: false,
						idPayTerms: false
					},
					document: {}

				};
				this.getView().byId("idReqComments").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idCredit").setNextStep(this.getView().byId("idAttach"));
				objVar.WorkflowCycle = false;
				objVar.AllowChanges = true;
			}

			this.oLocalModel = new sap.ui.model.json.JSONModel(onView);
			this.oLocalModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			oView.setModel(this.oLocalModel, "localModel");

		},
		onChangeRequestType: function () {
			var RequestType = this.getView().byId("idRequestType").getSelectedKey();
			if (RequestType === "") {
				objVar.zmsg = "Please Select Customer Request Type!";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();
							window.reload();

						}
					});
				return;
			} else {
				if (RequestType === "M") {
					this.getView().getModel("localModel").setProperty("/idCustomerGroup", true);
				}
				this.getView().getModel("localModel").setProperty("/idCustID", true);
				this.getView().getModel("localModel").setProperty("/idRequestType", false);
			}
			// if (customerData.RequestId && customerData.RequestId !== "" && customerData.RequestType === RequestType) {
			// 	this.getView().getModel("localModel").setProperty("/idRequestId", true);
			// 	this.getView().byId("idRequestId").setText(customerData.RequestId);
			// 	this.getView().byId("idRequestType").setSelectedKey(customerData.RequestType);
			// 	objVar.AllowChanges = false;
			// 	this.getView().getModel("localModel").setProperty("/idPendingFrom", true);
			// 	objVar.zmsg = "Customer has already Pending Request " + customerData.RequestId;
			// 	sap.m.MessageBox.alert(
			// 		objVar.zmsg, {
			// 			onClose: function (oAction) {
			// 				//	window.print();

			// 			}
			// 		});
			// 	objVar.RequestCreated = true;

			// } else {
			// 	customerData.RequestId = "";
			// 	customerData.RequestType = RequestType;
			// 	this.getView().byId("idRequestId").setText(customerData.RequestId);
			// 	this.getView().byId("idRequestType").setSelectedKey(customerData.RequestType);
			// }
		},
		onEditCredit: function () {
			this.getView().getModel("localModel").setProperty("/idCustType", true);

			if (customerData.RequestType === "M") {
				this.getView().getModel("localModel").setProperty("/idPriceType", true);
				this.getView().getModel("localModel").setProperty("/idCreditLimit", false);
				this.getView().getModel("localModel").setProperty("/idPayTerms", false);
				this.getView().getModel("localModel").setProperty("/idMobile", true);
				this.getView().getModel("localModel").setProperty("/idEmailId", true);
			} else if (customerData.RequestType === "C") {
				this.getView().getModel("localModel").setProperty("/idPriceType", false);
				this.getView().getModel("localModel").setProperty("/idCreditLimit", true);
				if (customerData.Zterm === "Z002" || customerData.Zterm === "Z003" || customerData.Zterm === "Z004" || customerData.Zterm ===
					"Z005" ||
					customerData.Zterm === "Z006" || customerData.Zterm === "Z007" || customerData.Zterm === "Z008") {

					this.getView().getModel("localModel").setProperty("/idCustType", false);
				} else {
					this.getView().getModel("localModel").setProperty("/idPayTerms", true);
					this.getView().getModel("localModel").setProperty("/idCustType", true);
				}

				this.getView().getModel("localModel").setProperty("/idMobile", true);
				this.getView().getModel("localModel").setProperty("/idEmailId", true);
				this.getView().getModel("localModel").setProperty("/idPayTerms", true);
			}

			objVar.AllowChanges = true;

		},
		onSave: function (oEvent) {

			var oModel = this.getOwnerComponent().getModel();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();
			var salesOffice = this.getView().byId("idSalesOffice").getText();
			var division = this.getView().byId("idDivision").getText();
			var requestType = objVar.RequestType = this.getView().byId("idRequestType").getSelectedKey();

			var that = this;
			if (customer === "" || (salesOffice === "" || division === "")) {
				//Message
				objVar.zmsg = "Please provide Customer Number and Enter";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			} else {
				if (!requestType || requestType === "") {
					objVar.zmsg = "Please Select Request Type";
					sap.m.MessageBox.alert(
						objVar.zmsg, {
							onClose: function (oAction) {
								//	window.print();

							}
						});
					return;
				}
				var sPath = "/AllowedCustomerSet('" + customer + "')"
				oModel.read(sPath, {
					success: function (oData, response) {
						if (oData.Allowed === false) {
							sap.m.MessageBox.error(
								oData.Message, {
									onClose: function (oAction) {
										location.reload();

									}
								});
						}

					},
					error: function () {
						sap.m.MessageToast.show("No Data retreived");
					}
				});
				this.getView().getModel("localModel").setProperty("/idRequestType", false);
				this.getView().byId("idCustID").setEditable(false);
				objVar.CustomerId = this.getView().byId("idCustID").getValue();
				this._wizard.validateStep(this.byId("idCustomerDet"));
				if (objVar.WorkflowCycle === true) {
					this._wizard.validateStep(that.byId("idCredit"));
				}

				if (requestType === 'M') {
					validate.priceType = true;
					oModel.read("/priceTypeSet", {
						success: function (oData, response) {
							var ocustomerTypeSet = new JSONModel();
							ocustomerTypeSet.setData(oData);
							that.getView().setModel(ocustomerTypeSet, "priceType");
						}.bind(this),
						error: function () {
							sap.m.MessageToast.show("No Data retreived");
						}
					});
					if (requestId === "") {
						that.byId("idPriceType").setSelectedKey('2');
						this.getView().getModel("localModel").setProperty("/idPriceType", false);
					}
					this.getView().getModel("localModel").setProperty("/required/idCustType", false);
					this.getView().getModel("localModel").setProperty("/required/idPriceType", true);
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", false);
					this.getView().getModel("localModel").setProperty("/required/idPayTerms", false);

				} else {
					// that.getView().byId("idTable1").setVisible(false);

					validate.priceType = false;
					validate.paymentTerm = true;
					validate.newCreditLimit = true;
					validate.customerType = true;
					oModel.read("/customerTypeSet", {
						success: function (oData, response) {
							var ocustomerTypeSet = new JSONModel();
							ocustomerTypeSet.setData(oData);
							this.getView().setModel(ocustomerTypeSet, "customerType");
						}.bind(this),
						error: function () {
							sap.m.MessageToast.show("No Data retreived");
						}
					});
					oModel.read("/paytermsSet", {
						success: function (oData, response) {
							var ocustomerTypeSet = new JSONModel();
							ocustomerTypeSet.setData(oData);
							this.getView().setModel(ocustomerTypeSet, "payterms");
						}.bind(this),
						error: function () {
							sap.m.MessageToast.show("No Data retreived");
						}
					});
					this.getView().getModel("localModel").setProperty("/required/idCustType", true);
					this.getView().getModel("localModel").setProperty("/required/idPriceType", false);
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", true);
					this.getView().getModel("localModel").setProperty("/required/idPayTerms", true);
					if (customerData.CustomerType === '2') {
						this.getView().getModel("localModel").setProperty("/idCustType", false);
						// this.getView().getModel("localModel").setProperty("/idPayTerms", false);
					}
				}
				var filter = [];
				//var Pernr = id;
				//Ztempid = "'" + this.zrecord + "'";

				var sPath = "/AginingDataSet('" + objVar.CustomerId + "')";
				var osfAge = that.getView().byId("idAging");
				oModel.read(sPath, {
					success: function (oDataAging, response) {
						var oModel1 = new sap.ui.model.json.JSONModel(oDataAging);
						osfAge.setModel(oModel1);
						//objVar.Comments = oDataAging;

						//that._wizard.validateStep(that.byId("idCredit"));
					},
					error: function (oError) {}
				});
				if (requestId && requestId !== "") {

					var myFilter = new sap.ui.model.Filter("RequestId", sap.ui.model.FilterOperator.EQ, (requestId));
					filter.push(myFilter);
					oModel.read("/AttachmentsSet", {
						filters: filter,
						success: function (oData, response) {
							for (var i = 0; i < oData.results.length; i++) {
								var obj = oData.results[i];
								switch (obj.Ztype) {
								case "VAT":
									that.getView().getModel("localModel").setProperty("/idfileVatBtn", true);

									that.getView().byId("idfileVatBtn").setText(obj.Filename);

									break;
								case "ID":
									that.getView().getModel("localModel").setProperty("/idfileID", true);

									that.getView().byId("idfileID").setText(obj.Filename);
									break;
								case "CR":
									that.getView().getModel("localModel").setProperty("/idfileCR", true);
									that.getView().byId("idfileCR").setText(obj.Filename);
									break;
								case "AGENCY":
									that.getView().getModel("localModel").setProperty("/idfileAgency", true);
									that.getView().byId("idfileAgency").setText(obj.Filename);
									break;
								case "BANKSTMT":
									that.getView().getModel("localModel").setProperty("/idfileBankStmt", true);
									that.getView().byId("idfileBankStmt").setText(obj.Filename);
									break;
								case "SHOPLICENSE":
									that.getView().getModel("localModel").setProperty("/idfileLicense", true);
									that.getView().byId("idfileLicense").setText(obj.Filename);
									break;
								case "PROMISSORY":
									that.getView().getModel("localModel").setProperty("/idfilePromissory", true);
									that.getView().byId("idfilePromissory").setText(obj.Filename);
									break;
								case "CREDITACC":
									that.getView().getModel("localModel").setProperty("/idfileCreditAcc", true);
									that.getView().byId("idfileCreditAcc").setText(obj.Filename);
									break;
								case "GUARANTEE":
									that.getView().getModel("localModel").setProperty("/idfileBankLetter", true);
									that.getView().byId("idfileBankLetter").setText(obj.Filename);
									break;
								case "AGING":
									that.getView().getModel("localModel").setProperty("/idfileAgingReport", true);
									that.getView().byId("idfileAgingReport").setText(obj.Filename);
									break;
								case "SEMA":
									that.getView().getModel("localModel").setProperty("/idfileSEMAReport", true);
									that.getView().byId("idfileSEMAReport").setText(obj.Filename);
									break;
								}
							}
						},
						error: function (oError) {}
					});

					that.getView().getModel("localModel").setProperty("/idCustType", false);
					that.getView().getModel("localModel").setProperty("/idPriceType", false);
					that.getView().getModel("localModel").setProperty("/idCreditLimit", false);
					that.getView().getModel("localModel").setProperty("/idPayTerms", false);
					that.getView().getModel("localModel").setProperty("/idMobile", false);
					that.getView().getModel("localModel").setProperty("/idEmailId", false);
					that.getView().getModel("localModel").setProperty("/idVAT", false);
					that.getView().getModel("localModel").setProperty("/idCRNo", false);

					if (objVar.WorkflowCycle === false) {
						var sPath = "/CreditLimitSet('" + objVar.RequestID + "')";

						oModel.read(sPath, {
							success: function (oData1, response) {

								that.byId("idCustType").setSelectedKey(oData1.CustomerTypeNew);
								that.byId("idPriceType").setSelectedKey(oData1.ZpricetypeNew);
								that.byId("idPendingFrom").setText(oData1.PendingFrom);
								that.byId("idCreditLimit").setValue(oData1.ZcreditlimitNew);
								that.byId("idPayTerms").setSelectedKey(oData1.ZtermNew);

								that.byId("idMobile2").setValue(oData1.MobileNew);
								that.byId("idEmailId2").setValue(oData1.EMailNew);
								that.getView().getModel("localModel").setProperty("/idSaveCredit", false);

								//that._wizard.validateStep(that.byId("idCredit"));
							},
							error: function (oError) {}
						});

						sPath = "/CommentsSet('" + objVar.RequestID + "')";
						var osf = that.getView().byId("idCommentsAll");
						oModel.read(sPath, {
							success: function (oDataComments, response) {
								var oModel1 = new sap.ui.model.json.JSONModel(oDataComments);
								osf.setModel(oModel1);
								objVar.Comments = oDataComments;

								//that._wizard.validateStep(that.byId("idCredit"));
							},
							error: function (oError) {}
						});

					} else {
						that.getView().getModel("localModel").setProperty("/idSaveCredit", false);
					}

				}
			}

		},
		handleUploadPressVat: function (oEvent) {
			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {

				var oFileUploader = this.getView().byId("idfileUploaderVAT");

				this.event = oEvent;
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {
					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, 'VAT');
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		onValueHelpSearchCust: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("PayerId", FilterOperator.Contains, sValue);
			//var oFilter2 = new Filter("Name", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onValueHelpRequestCust: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView1 = this.getView();

			this.inputId1 = oEvent.getSource().getId();

			if (!this._valueHelpDialogCust) {
				this._valueHelpDialogCust = sap.ui.xmlfragment(
					"contract.zsdcreditlimit.fragments.ValueHelpDialogCust",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCust);
			}
			this._valueHelpDialogCust.getBinding("items").filter([new Filter(
				"PayerId",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCust.open(sInputValue);
		},
		onValueHelpCloseCust: function (oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("idCustID").setValue(oSelectedItem.getTitle());
			this.byId("idNameEn").setText(oSelectedItem.getDescription());

			var so = oSelectedItem.getTitle();
			if (so === "") {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCustomerDet"));
			} else {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.None);

			}
		},
		handleUploadPressAgency: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderAgency");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "LAGENCY");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		onEnterCustomer: function () {
			var customerId = this.getView().byId("idCustID").getValue();
			var RequestType = this.getView().byId("idRequestType").getSelectedKey();
			if (RequestType == "") {
				objVar.zmsg = "Please Select Customer Request Type!";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();
							window.reload();

						}
					});
				return;
			}
			if (customerId !== "") {
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/CustomerSet";
				//(PayerId='" + customerId + "',RequestType='"+RequestType+"')";
				var myFilter = [];
				myFilter[0] = new sap.ui.model.Filter("PayerId", sap.ui.model.FilterOperator.EQ, (customerId));
				myFilter[1] = new sap.ui.model.Filter("RequestType", sap.ui.model.FilterOperator.EQ, (RequestType));
				oModel.read(sPath, {
					filters: myFilter,
					success: function (oDataArray, response) {
						debugger;
						if (oDataArray && oDataArray.results && oDataArray.results.length === 0) {
							objVar.zmsg = "No Record Found for the customer " + customerId;
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {
										//	window.print();

									}
								});
							that.getView().byId("idNameEn").setText("");
							that.getView().byId("idNameAr").setText("");
							that.getView().byId("idRequestId").setText("");
							that.getView().byId("idSalesOffice").setText("");
							that.getView().byId("idSoffDescr").setText("");
							that.getView().byId("idChannel").setText("");
							that.getView().byId("idChannelDescr").setText("");
							that.getView().byId("idDivision").setText("");
							that.getView().byId("idDivisonDescr").setText("");
							that.getView().byId("idPreseller").setText("");
							that.getView().byId("idPresellerName").setText("");
							that.getView().byId("idZcreditLimit").setText("");
							that.getView().byId("idPayTerms1").setText("");
							that.getView().byId("idReceivable").setText("");
							that.getView().byId("idAvailable").setText("");
							that.getView().byId("idAvgSales").setText("");
							// that.getView().byId("idRequestType").setSelectedKey("");
							that.getView().getModel("localModel").setProperty("/idRequestType", true);
							return;
						}
						var oData = oDataArray.results[0];
						if (oData.RequestType === "") {
							oData.RequestType = that.getView().byId("idRequestType").getSelectedKey();
						}
						oData.ZtermNew = objVar.PaymentTerm = oData.Zterm;
						oData.ZcreditlimitNew = oData.Zcreditlimit;
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						objVar.PayerId = oData.PayerId;
						var bpURl = window.location.origin + "/fiori#Customer-manage&//C_BusinessPartnerCustomer(BusinessPartner='" + objVar.PayerId +
							"',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)";
						that.getView().getModel("localModel").setProperty("/bpURL", bpURl);
						var osf = that.getView().byId("SimpleFormChange354");
						var osf2 = that.getView().byId("SimpleFormChange351");
						if (oData.RequestId && oData.RequestId !== "") {
							that.getView().getModel("localModel").setProperty("/idRequestId", true);
							that.getView().byId("idRequestId").setText(oData.RequestId);
							objVar.AllowChanges = false;
							that.getView().getModel("localModel").setProperty("/idPendingFrom", true);
							objVar.zmsg = "Customer has already Pending Request " + oData.RequestId;
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {
										//	window.print();

									}
								});
							objVar.RequestCreated = true;

						} else if (oData.Error === 'X') {
							objVar.zmsg = "No Customer with ID " + customerId + " or Customer may be blocked";
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {
										//	window.print();

									}
								});
							return;
						} else {
							that.getView().getModel("localModel").setProperty("/idRequestType", false);
							objVar.RequestCreated = true;
							oData.VATNew = oData.VAT;
							oData.ZCRNoNew = oData.ZCRNo;
							oData.EMailNew = oData.EMail;
							oData.MobileNew = oData.Mobile;
							if (oData.ZtermNew === "Z001") {
								oData.CustomerType = oData.CustomerTypeNew = "1";
							} else if (oData.ZtermNew === "Z14") {
								oData.CustomerType = oData.CustomerTypeNew = "3";
							} else if (oData.ZtermNew === "ZAP") {
								oData.CustomerType = oData.CustomerTypeNew = "4";
							} else if (oData.ZtermNew === "Z002" || oData.ZtermNew === "Z003" || oData.ZtermNew === "Z004" || oData.ZtermNew ===
								"Z005" ||
								oData.ZtermNew === "Z006" || oData.ZtermNew === "Z007" || oData.ZtermNew === "Z008") {
								oData.CustomerType = oData.CustomerTypeNew = "2";
								objVar.noCheckforFileUpload = true;
							}

						}
						if (oData.PromNoteExpDate !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate", true);
						}
						if (oData.PromNoteExpDate2 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate2", true);
						}
						if (oData.PromNoteExpDate3 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate3", true);
						}
						if (oData.PromNoteExpDate4 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate4", true);
						}
						customerData = oData;
						osf.setModel(oModel3);
						osf2.setModel(oModel3);
						if (oData.Error !== "") {
							that.getView().getModel("localModel").setProperty("/idRequestId", true);
						} else {
							that.getView().getModel("localModel").setProperty("/idRequestId", false);
						}

						if (oData.CustomerTypeNew !== "") {
							that.onChangeCustType("OnLoad");
						}
						if (oData.ZtermNew !== "") {
							that.onChangePayTerm("NO_WARNING");
						}
					},
					error: function (message, error) {
						that.getView().byId("idNameEn").setText("");
						that.getView().byId("idNameAr").setText("");
						that.getView().byId("idRequestId").setText("");
						that.getView().byId("idSalesOffice").setText("");
						that.getView().byId("idSoffDescr").setText("");
						that.getView().byId("idChannel").setText("");
						that.getView().byId("idChannelDescr").setText("");
						that.getView().byId("idDivision").setText("");
						that.getView().byId("idDivisonDescr").setText("");
						that.getView().byId("idPreseller").setText("");
						that.getView().byId("idPresellerName").setText("");
						that.getView().byId("idZcreditLimit").setText("");
						that.getView().byId("idPayTerms1").setText("");
						that.getView().byId("idReceivable").setText("");
						that.getView().byId("idAvailable").setText("");
						that.getView().byId("idAvgSales").setText("");
						that.getView().byId("idRequestType").setSelectedKey("");
						that.getView().getModel("localModel").setProperty("/idRequestType", false);
						//objVar.zmsg = "No Customer with ID " + customerId + " or Customer may be blocked";
						if (message && message.responseText !== '') {
							objVar.zmsg = $.parseJSON(message.responseText).error.message.value;
						}

						if (objVar.zmsg === "") {
							objVar.zmsg = "No Customer with ID " + customerId + " or Customer may be blocked";
						}
						sap.m.MessageBox.alert(
							objVar.zmsg, {
								onClose: function (oAction) {
									//	window.print();

								}
							});
						// sap.m.MessageToast.show("No Data retreived");

					}

				});

			}
		},

		handleUploadPressBankStmt: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderBankStmt");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "BANKSTMT");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		handleUploadPressShopLicense: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderShopLicense");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "SHOPLICENSE");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		handleUploadPressCustomerId: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderCustomerId");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "CUSTOMERID");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		handleUploadPressCR: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderCR");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "CR");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},

		handleUploadPressPromissory: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderPromissory");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {
					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "PROMISSORY");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},

		handleUploadPressGuarantee: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderGuarantee");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},

		handleUploadPressCreditAccount: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderCreditAccount");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {
					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "CREDITACC");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		handleUploadPressAgingReport: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderAgingReport");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {
					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "AGING");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		handleUploadPresssSEMAReport: function (oEvent) {

			//check if temp id is created
			if (this.getView().byId("idCustID").getValue() !== "") {
				var oFileUploader = this.getView().byId("idfileUploaderSEMAReport");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				var that = this;
				this.filename = file.name;
				this.filetype = file.type;

				var reader = new FileReader();

				reader.onload = function (e) {
					var vContent = e.currentTarget.result.replace(
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						"");
					that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "SEMA");
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}
		},
		onCheckSave: function (customerCredit) {
			var that = this;
			var ptype;
			if (objVar.PaymentTerm === "Z14") {
				ptype = "Temporary credit";

			} else if (objVar.PaymentTerm === "ZAP") {
				ptype = "Advance Payment";
			} else if (objVar.PaymentTerm === "Z001") {
				ptype = "Cash";
			} else {
				ptype = "Credit";
			}
			objVar.zmsg = "Previously the Customer  was " + ptype + ", Do you want to proceed";
			sap.m.MessageBox.confirm(
				objVar.zmsg, {
					icon: MessageBox.Icon.INFORMATION,
					title: "Customer Type Change",
					actions: [sap.m.MessageBox.Action.OK,
						sap.m.MessageBox.Action.CANCEL
					],
					emphasizedAction: MessageBox.Action.YES,
					onClose: function (sAction) {
						// that._wizard.validateStep(that.byId("idCredit"));
						if (sAction === sap.m.MessageBox.Action.OK) {
							that.onSaveCreditAfter(customerCredit);
						}
					}

				});
		},
		onSaveCreditDetails: function (oEvent) {

			var customer = this.getView().byId("idCustID").getValue();

			var customerCredit = {};
			// var that = this;
			customerCredit.PayerId = customer;
			customerCredit.CustomerTypeNew = this.getView().byId("idCustType").getSelectedKey();
			if (validate.customerType && customerCredit.CustomerTypeNew === "") {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));

				return;
			} else {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.None);
			}

			objVar.PaymentTerm = customerCredit.ZtermNew = this.getView().byId("idPayTerms").getSelectedKey();
			customerCredit.ZpricetypeNew = this.getView().byId("idPriceType").getSelectedKey();

			customerCredit.Zsalesoffice = this.getView().byId("idSalesOffice").getText();
			customerCredit.Zchannel = this.getView().byId("idChannel").getText();
			customerCredit.Zspart = this.getView().byId("idDivision").getText();
			customerCredit.Preseller = this.getView().byId("idPreseller").getText();
			customerCredit.RequestId = this.getView().byId("idRequestId").getText();
			//customerCredit.VATNew = this.getView().byId("idVAT2").getValue();
			//customerCredit.CRNoNew = this.getView().byId("idCRNo2").getValue();
			customerCredit.MobileNew = this.getView().byId("idMobile2").getValue();
			customerCredit.EMailNew = this.getView().byId("idEmailId2").getValue();
			customerCredit.RequestType = this.getView().byId("idRequestType").getSelectedKey();
			customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');
			if(customerCredit.ZcreditlimitNew &&customerCredit.ZcreditlimitNew===""||customerCredit.ZcreditlimitNew===undefined){
				customerCredit.ZcreditlimitNew = "0.00";
			}
			if (validate.customerContact && customerCredit.MobileNew === "") {
				this.getView().byId("idMobile2").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				return;
			} else {
				this.getView().byId("idMobile2").setValueState(sap.ui.core.ValueState.None);
			}
			if (validate.customerEmail && customerCredit.EMailNew === "") {
				this.getView().byId("idEmailId2").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				return;
			} else {
				this.getView().byId("idMobile2").setValueState(sap.ui.core.ValueState.None);
			}
			if (customerCredit.RequestType === 'M' && customerCredit.ZpricetypeNew === '2') {
				this.getView().getModel("localModel").setProperty("/idSaveTable", true);

			} else {
				this.getView().getModel("localModel").setProperty("/idSaveTable", false);
			}
			this.getView().getModel("localModel").setProperty("/idSaveTableVis", true);
			// } else {
			// 	this.getView().getModel("localModel").setProperty("/idSaveTableVis", false);
			// }
			var that = this;
			if (customerCredit.RequestId === "" && customerCredit.RequestType !== "M") {
				var oModel = this.getOwnerComponent().getModel();
				var sPath = "/UserMandDocSet(CurrentApproval='REQ',ReqType='" + customerCredit.CustomerTypeNew + "',RequestId='')";
				oModel.read(sPath, {
					success: function (oData, response) {
						that.getView().getModel("localModel").setProperty("/document", oData);
						if ((oData.VAT || oData.LegAgcy || oData.BankStmt || oData.ShopLic || oData.CRNo || oData.CustId || oData.PromNote ||
								oData.BankGuar ||
								oData.CrdAccFaci || oData.Agining || oData.Simah) === '') {
							that._wizard.validateStep(that.byId("idAttach"));

						} else {
							that._wizard.invalidateStep(that.byId("idAttach"));
						}
						//Validate all steps
						that.onChangeCustType("OnLoad");
						// var ocustomerTypeSet = new JSONModel();
						// ocustomerTypeSet.setData(oData);
						// this.getView().setModel(ocustomerTypeSet, "customerType");
					},
					error: function () {
						var data = {
							CurrentApproval: "REQ",
							ReqType: customerCredit.RequestType,
							ApprUser: false,
							VAT: false,
							LegAgcy: false,
							BankStmt: false,
							ShopLic: false,
							CRNo: false,
							CustId: false,
							PromNote: false,
							BankGuar: false,
							CrdAccFaci: false,
							Agining: false,
							Simah: false

						}
						that._wizard.validateStep(this.byId("idAttach"));
						that.getView().getModel("localModel").setProperty("/document", data);
						sap.m.MessageToast.show("No Data retreived");
						//Validate all steps
						that.onChangeCustType("OnLoad");
					}
				});
			} else {
				that._wizard.validateStep(that.byId("idAttach"));
			}

			if (customerData.CustomerType === '2' && customerCredit.CustomerTypeNew !== '2') {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				objVar.zmsg = "Cannot Change Customer from Credir to other"
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
				return;
			}
			if (customerCredit.CustomerTypeNew === '1') {
				customerCredit.ZtermNew = "Z001";
				//objVar.PaymentTerm
				if (objVar.PaymentTerm === "Z001") {
					this.onSaveCreditAfter(customerCredit);
				} else {
					this.onCheckSave(customerCredit);
				}
				//this.onSaveCreditAfter(customerCredit);
			} else if (customerCredit.CustomerTypeNew === '3') {
				customerCredit.ZtermNew = "Z14";
				if (parseFloat(customerCredit.ZcreditlimitNew) <= 0) {
					sap.m.MessageToast.show("Credit can't be Zero");
					return;
				}
				if (objVar.PaymentTerm === "Z14") {
					this.onSaveCreditAfter(customerCredit);
				} else {
					this.onCheckSave(customerCredit);
				}
				// customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue();
				customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');

			} else if (customerCredit.CustomerTypeNew === '4') {
				customerCredit.ZtermNew = "ZAP";
				if (objVar.PaymentTerm === "ZAP") {
					this.onSaveCreditAfter(customerCredit);
				} else {

					this.onCheckSave(customerCredit);
				}
				// customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue();
				customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');

			} else if (customerCredit.CustomerTypeNew === '2') {
				customerCredit.ZcreditlimitNew = parseFloat(this.getView().byId("idCreditLimit").getValue().replaceAll(',', ''));
				var preCreditLimit = parseFloat(this.getView().byId("idZcreditLimit").getText().replaceAll(',', ''));
				if (customerCredit.ZcreditlimitNew <= 0) {
					sap.m.MessageToast.show("Credit can't be Zero");
					return;
				}
				if (objVar.PaymentTerm === "ZAP" || objVar.PaymentTerm === "Z001" || objVar.PaymentTerm === "Z14") {
					sap.m.MessageToast.show("Payment term for credit is not supported");
					return;
				}
				that = this;
				if (parseFloat(customerCredit.ZcreditlimitNew) < preCreditLimit && (customerCredit.CustomerTypeNew === "2")) {
					objVar.zmsg = "Credit limit is lessthan the previous limit " + preCreditLimit + " SAR";
					sap.m.MessageBox.confirm(
						objVar.zmsg, {
							icon: MessageBox.Icon.INFORMATION,
							title: "Credit Limit Adjustment",
							actions: [sap.m.MessageBox.Action.OK,
								sap.m.MessageBox.Action.CANCEL
							],
							emphasizedAction: MessageBox.Action.YES,
							onClose: function (sAction) {
								// that._wizard.validateStep(that.byId("idCredit"));

								if (sAction === sap.m.MessageBox.Action.OK) {
									if (objVar.PaymentTerm !== "ZAP" || objVar.PaymentTerm !== "Z001" || objVar.PaymentTerm !== "Z14") {
										// that.onSaveCreditAfter(customerCredit);
										that.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);

									} else {
										customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');
										that.onCheckSave(customerCredit);
									}

								} else {
									this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
								}
							}

						});

				} else {
					customerCredit.ZcreditlimitNew = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');
					if (objVar.PaymentTerm !== "ZAP" || objVar.PaymentTerm !== "Z001" || objVar.PaymentTerm !== "Z14") {
						this.onSaveCreditAfter(customerCredit);
					} else {
						this.onCheckSave(customerCredit);
					}
				}
			}

		},

		onSaveCreditAfter: function (customerCredit) {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			oModel.create("/CreditLimitSet",
				customerCredit, {
					success: function (data) {
						if (data.Error === 'X') {
							sap.m.MessageBox.alert(
								"Error saving Credit Data !", {
									onClose: function (oAction) {
										//	window.print();

									}
								});

						} else {
							that.getView().byId("idRequestId").setVisible(true);
							that.getView().byId("idLblRequestId").setVisible(true);
							that.getView().byId("idRequestId").setText(data.RequestId);
							objVar.zmsg = "Request ID " + data.RequestId + " " +
								"has been created for Credit Limit Details. Please click on STEP 3 to proceed further !";

							if (customerCredit.ZpricetypeNew === '2' || customerCredit.ReqType === "C") {
								if (customerCredit.ZpricetypeNew === '2') {
									that.getView().getModel("localModel").setProperty("/idSaveTable", true);
								}
								that.getView().getModel("localModel").setProperty("/idSpecialPriceTab", true);
								var myFilter = new sap.ui.model.Filter("RequestId", sap.ui.model.FilterOperator.EQ, (data.RequestId));
								oModel.read("/itemsSet", {
									filters: [myFilter],
									success: function (oData, response) {
										var ocustomerTypeSet = new JSONModel();
										ocustomerTypeSet.setData(oData);
										that.getView().setModel(ocustomerTypeSet, "materialList");
									}.bind(this),
									error: function () {
										sap.m.MessageToast.show("No Data retreived");
									}
								});

							} else {
								that.getView().getModel("localModel").setProperty("/idSaveTable", false);
								that.getView().getModel("localModel").setProperty("/idSpecialPriceTab", false);
							}
							that.getView().getModel("localModel").setProperty("/idMobile", false);
							that.getView().getModel("localModel").setProperty("/idEmailId", false);
							that.getView().getModel("localModel").setProperty("/idCustType", false);
							that.getView().getModel("localModel").setProperty("/idPriceType", false);
							that.getView().getModel("localModel").setProperty("/idCreditLimit", false);
							that.getView().getModel("localModel").setProperty("/idMobile2", false);
							that.getView().getModel("localModel").setProperty("/idEmailId2", false);
							that.getView().getModel("localModel").setProperty("/idSaveCredit", false);
							that.getView().getModel("localModel").setProperty("/idPayTerms", false);
							MessageToast.show(objVar.zmsg, {
								duration: 2500, // default
								width: "30em", // default
								my: "center center", // default
								at: "center center", // default
								of: window, // default
								offset: "0 0", // default
								collision: "fit fit", // default
								onClose: null, // default
								autoClose: true, // default
								animationTimingFunction: "ease", // default
								animationDuration: 1000, // default
								closeOnBrowserNavigation: true // default
							});
							that._wizard.validateStep(that.byId("idCredit"));
						}
					},
					error: function (oError) {
						MessageToast.show("Error while submitting request. Please Try again.", {
							duration: 9000, // default
							width: "30em", // default
							my: "center center", // default
							at: "center center", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});
					}
				});
		},
		handleUploadFiles: function (oEvent) {

			var oFileUploader = " ";
			if (this.getView().byId("idRequestId").getText() !== "") {
				//shop licesnse
				oFileUploader = this.getView().byId("idfileUploaderShopLicense");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameLicense = file.name;
					this.filetypeLicense = file.type;
					this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//		"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeLicense + ";base64,", "");
						//that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "SHOPLICENSE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "SHOPLICENSE",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameLicense,
							"Filetype": that.filetypeLicense

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Guarantee
				oFileUploader = this.getView().byId("idfileUploaderGuarantee");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameGuarantee = file.name;
					this.filetypeGuarantee = file.type;
					this.getView().byId("idfileUploaderGuarantee").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeGuarantee + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "GUARANTEE",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameGuarantee,
							"Filetype": that.filetypeGuarantee

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//VAT
				oFileUploader = this.getView().byId("idfileUploaderVAT");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {

					this.filenameVAT = file.name;
					this.filetypeVAT = file.type;
					var that = this;
					this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						// var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						// 	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeVAT + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "VAT",
							// "Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameVAT,
							"Filetype": that.filetypeVAT

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Agency
				oFileUploader = this.getView().byId("idfileUploaderAgency");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameAgency = file.name;
					this.filetypeAgency = file.type;
					this.getView().byId("idfileUploaderAgency").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeAgency + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "AGENCY",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameAgency,
							"Filetype": that.filetypeAgency

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Bank stmt
				oFileUploader = this.getView().byId("idfileUploaderBankStmt");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameBankStmt = file.name;
					this.filetypeBankStmt = file.type;
					this.getView().byId("idfileUploaderBankStmt").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						/*	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
								"");*/
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeBankStmt + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "BANKSTMT",
							// "Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameBankStmt,
							"Filetype": that.filetypeBankStmt

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//customer ID
				oFileUploader = this.getView().byId("idfileUploaderCustomerId");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameID = file.name;
					this.filetypeID = file.type;
					this.getView().byId("idfileUploaderCustomerId").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//		"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeID + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "ID",
							//	"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameID,
							"Filetype": that.filetypeID

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//CR
				oFileUploader = this.getView().byId("idfileUploaderCR");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameCR = file.name;
					this.filetypeCR = file.type;
					this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeCR + ";base64,", "");

						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "CR",
							//	"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameCR,
							"Filetype": that.filetypeCR

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Promissory
				oFileUploader = this.getView().byId("idfileUploaderPromissory");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenamePromissory = file.name;
					this.filetypePromissory = file.type;
					this.getView().byId("idfileUploaderPromissory").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypePromissory + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "PROMISSORY",
							//	"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenamePromissory,
							"Filetype": that.filetypePromissory

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//credit account
				oFileUploader = this.getView().byId("idfileUploaderCreditAccount");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameCreditAcc = file.name;
					this.filetypeCreditAcc = file.type;
					this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeCreditAcc + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "CREDITACC",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameCreditAcc,
							"Filetype": that.filetypeCreditAcc

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}
				//Aging Report
				oFileUploader = this.getView().byId("idfileUploaderAgingReport");
				//if (oFileUploader !== "") {
				domRef = oFileUploader.getFocusDomRef();
				file = domRef.files[0];
				if (domRef.files.length !== 0) {
					that = this;
					this.filenameAging = file.name;
					this.filetypeAging = file.type;
					this.getView().byId("idfileUploaderAgingReport").setValueState(sap.ui.core.ValueState.None);
					reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + this.filetypeAging + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "AGING",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameAging,
							"Filetype": that.filetypeAging

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvents) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}
				//SEMA Report
				oFileUploader = this.getView().byId("idfileUploaderSEMAReport");
				//if (oFileUploader !== "") {
				domRef = oFileUploader.getFocusDomRef();
				file = domRef.files[0];
				if (domRef.files.length !== 0) {
					that = this;
					this.filenameSEMA = file.name;
					this.filetypeSEMA = file.type;
					this.getView().byId("idfileUploaderSEMAReport").setValueState(sap.ui.core.ValueState.None);
					reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + this.filetypeSEMA + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModel = that.getView().getModel();
						var payLoad = {
							"RequestId": that.getView().byId("idRequestId").getText(),
							"Ztype": "SEMA",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameSEMA,
							"Filetype": that.filetypeSEMA

						};
						oDataModel.create("/AttachmentsSet", payLoad, {
							success: function (oEvents) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//at last
				var valueGuarantee = this.getView().byId("idfileUploaderGuarantee").getValueState();
				var valueVat = this.getView().byId("idfileUploaderVAT").getValueState();
				var Agency = this.getView().byId("idfileUploaderAgency").getValueState();
				var bankstmt = this.getView().byId("idfileUploaderBankStmt").getValueState();
				var license = this.getView().byId("idfileUploaderShopLicense").getValueState();
				var custId = this.getView().byId("idfileUploaderCustomerId").getValueState();
				var cr = this.getView().byId("idfileUploaderCR").getValueState();
				var promissory = this.getView().byId("idfileUploaderPromissory").getValueState();
				var guarantee = this.getView().byId("idfileUploaderGuarantee").getValueState();
				var credit = this.getView().byId("idfileUploaderCreditAccount").getValueState();

				if (valueGuarantee !== "Error" && valueVat !== "Error" && Agency !== "Error" && bankstmt !== "Error" && license !== "Error" &&
					custId !== "Error" && cr !== "Error" && promissory !== "Error" && guarantee !== "Error" && credit !== "Error"
				) {
					this._wizard.validateStep(this.byId("idAttach"));
				} else {
					objVar.zmsg = "Please upload all highlighted documents !";
					sap.m.MessageBox.alert(
						objVar.zmsg, {
							onClose: function (oAction) {
								//	window.print();

							}
						});
				}

			} else {
				//show message
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}

		},
		onChangePriceType: function (oEvent) {

			var type = this.getView().byId("idPriceType").getSelectedKey();
			// var credlimt = this.getView().byId("idCreditLimit").getValue();
			var error = false;
			// var custType = this.getView().byId("idCustType").getSelectedKey();
			if (type === "") {
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;
			} else if (type === '1') {
				// this.getView().byId("idTable1").setVisible(false);
				this.getView().getModel("localModel").setProperty("/idSaveTableVis", false);
				// this.getView().byId("idBtnSaveTable").setVisible(false);
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.None);

			} else if (type === '2') {
				this.getView().getModel("localModel").setProperty("/idSaveTableVis", true);
				// this.getView().byId("idTable1").setVisible(true);
				// this.getView().byId("idBtnSaveTable").setVisible(true);
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.None);

			} else {
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.None);
			}
			// if (credlimt <= 0 && (custType === "2" || custType === "3")) {
			// 	error = true;
			// }
			if (error === true) {
				this.getView().getModel("localModel").setProperty("/idSaveCredit", false);
			} else if (objVar.AllowChanges) {
				this.getView().getModel("localModel").setProperty("/idSaveCredit", true);
			}
		},
		onChangeCustType: function (oEvent) {

			// this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
			if (oEvent !== "OnLoad") {
				this.getView().byId("idCreditLimit").setValue('0.000');
			}
			var dont_allow = false;
			var custType = this.getView().byId("idCustType").getSelectedKey();
			if (custType !== "") {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.None);
			} else {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));

			}
			var ZcustomerType = this.getView().byId("idCustType").getSelectedKey();
			//activate and deactivate
			if (this.getView().getModel("localModel").getProperty("/document/CustId") === 'X') {
				this.getView().byId("idfileUploaderCustomerId").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/BankStmt") === 'X') {
				this.getView().byId("idfileUploaderBankStmt").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/ShopLic") === 'X') {
				this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/LegAgcy") === 'X') {
				this.getView().byId("idfileUploaderAgency").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			// this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
			//this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.None);
			if (this.getView().getModel("localModel").getProperty("/document/CRNo") === 'X') {
				this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/VAT") === 'X') {
				this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}

			if (this.getView().getModel("localModel").getProperty("/document/CrdAccFaci") === "X") {
				this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/PromNote") === "X") {
				this.getView().byId("idfileUploaderPromissory").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/BankGuar") === "X") {
				this.getView().byId("idfileUploaderGuarantee").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/Agining") === "X") {
				this.getView().byId("idfileUploaderAgingReport").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (this.getView().getModel("localModel").getProperty("/document/Simah") === "X") {
				this.getView().byId("idfileUploaderSEMAReport").setValueState(sap.ui.core.ValueState.Error);
				dont_allow = true;
			}
			if (ZcustomerType === '1') {
				// this.getView().byId("idLabelCreditLimit").setVisible(false);
				this.getView().getModel("localModel").setProperty("/required/idCreditLimit", false);
				// this.getView().byId("idCreditLimit").setVisible(false);
				//this.getView().byId("idLabelPayTerms").setVisible(false);
				// this.getView().byId("idPayTerms").setEnabled(false);
				this.getView().getModel("localModel").setProperty("/idPayTerms", false);
				this.getView().byId("idPayTerms").setSelectedKey("Z001");
				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);

				//	this.getView().byId("idfileUploaderCreditAccount").setVisible(false);
				//	this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
				//	this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.Error);
				//	this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);

				// this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
				//this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.None);
				if (dont_allow === true) {
					this._wizard.invalidateStep(this.byId("idAttach"));
				} else {
					this._wizard.validateStep(this.byId("idAttach"));
				}

			} else if (ZcustomerType === '2') {
				// this.getView().byId("idLabelCreditLimit").setVisible(true);
				// this.getView().byId("idCreditLimit").setVisible(true);	
				if (objVar.RequestType === "C") {
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", true);
				} else {
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", false);
				}

				//this.getView().byId("idLabelPayTerms").setVisible(true);
				// this.getView().byId("idPayTerms").setEnabled(true);
				// if (customerData.Zterm === "ZAP" || customerData.Zterm === "Z001") {
				this.getView().getModel("localModel").setProperty("/idPayTerms", true);
				// }
				if(this.getView().byId("idPayTerms").getSelectedKey()==="" ||this.getView().byId("idPayTerms").getSelectedKey()===undefined)
				{
					this.getView().byId("idPayTerms").setSelectedKey(customerData.Zterm);
				}

				//if the channel is HORECA or WS, shoplicense is mandatory
				// if ((this.getView().byId("idChannel").getText() === '40' || this.getView().byId("idChannel").getVText() ===
				// 		'50')) {
				// 	if (this.getView().getModel("localModel").getProperty("/document/ShopLic") === "X") {
				// 		this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.Error);
				// 	}
				// }
				this.getView().byId("idfileUploaderCreditAccount").setVisible(true);
				// if (this.getView().getModel("localModel").getProperty("/document/CrdAccFaci") === "X") {
				// 	this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.Error);
				// }
				// if (this.getView().getModel("localModel").getProperty("/document/CustId") === "X") {
				// 	this.getView().byId("idfileUploaderCustomerId").setValueState(sap.ui.core.ValueState.Error);
				// }
				// if (this.getView().getModel("localModel").getProperty("/document/VAT") === "X") {
				// 	this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);
				// }
				if (dont_allow === true) {
					this._wizard.invalidateStep(this.byId("idAttach"));
				} else {
					this._wizard.validateStep(this.byId("idAttach"));
				}

			} else if (ZcustomerType === '3') {
				if (objVar.RequestType === "C") {
					// this.getView().byId("idCreditLimit").setVisible(true);	
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", true);
				} else {
					this.getView().getModel("localModel").setProperty("/required/idCreditLimit", false);
				}
				//this.getView().byId("idLabelPayTerms").setVisible(false);
				// this.getView().byId("idPayTerms").setEnabled(false);
				this.getView().getModel("localModel").setProperty("/idPayTerms", false);
				this.getView().byId("idPayTerms").setSelectedKey("Z14");
				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);

				//this.getView().byId("idfileUploaderCreditAccount").setVisible(true);
				//this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
				//this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.Error);
				//this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);
				// if (this.getView().getModel("localModel").getProperty("/document/CustId") === "X") {
				// 	this.getView().byId("idfileUploaderCustomerId").setValueState(sap.ui.core.ValueState.Error);
				// }
				// if (this.getView().getModel("localModel").getProperty("/document/CRNo") === "X") {
				// 	this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
				// }
				// if (his.getView().getModel("localModel").getProperty("/document/VAT") === "X") {
				// 	this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);
				// }
				// this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
				//	this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.None);
				//this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
				//	this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.None);
				//this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.Error);
				if (dont_allow === true) {
					this._wizard.invalidateStep(this.byId("idAttach"));
				} else {
					this._wizard.validateStep(this.byId("idAttach"));
				}
			} else if (ZcustomerType === '4') {
				// this.getView().byId("idLabelCreditLimit").setVisible(false);
				// this.getView().byId("idCreditLimit").setVisible(false);

				this.getView().getModel("localModel").setProperty("/required/idCreditLimit", false);
				// this.getView().byId("idPayTerms").setEnabled(false);
				this.getView().getModel("localModel").setProperty("/idPayTerms", false);
				this.getView().byId("idPayTerms").setSelectedKey("ZAP");
				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);
				// if (this.getView().getModel("localModel").getProperty("/document/CustId") === "X") {
				// 	this.getView().byId("idfileUploaderCustomerId").setValueState(sap.ui.core.ValueState.Error);
				// }
				// this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);

				// if (this.getView().getModel("localModel").getProperty("/document/CRNo") === "X") {
				// 	this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
				// }
				// if (this.getView().getModel("localModel").getProperty("/document/VAT") === "X") {
				// 	this.getView().byId("idfileUploaderVAT").setValueState(sap.ui.core.ValueState.Error);
				// }
				// this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
			}
			// make mandatory fields
			if (ZcustomerType === '2' || ZcustomerType === '3') {
				var creditlimit = this.getView().byId("idCreditLimit").getValue();
				if (creditlimit <= 0) {
					this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
					this.getView().getModel("localModel").setProperty("/idSaveCredit", false);
					this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.Error);
					this._wizard.invalidateStep(this.byId("idCredit"));
				}
			}

			/*if (ZcustomerType === '1' || ZcustomerType === '3') {
				this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("idfileUploaderShopLicense").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("idfileUploaderCreditAccount").setValueState(sap.ui.core.ValueState.None);
				this._wizard.validateStep(this.byId("idAttach"));
			}*/
			// this.getView().byId("idfileUploaderCR").setValueState(sap.ui.core.ValueState.Error);
		},
		onChangePayTerm: function (oEvent) {
			var payterm = this.getView().byId("idPayTerms").getSelectedKey();
			if (payterm !== "") {
				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);
				var ZcustomerType = this.getView().byId("idCustType").getValue();

				if (ZcustomerType !== "" && (payterm === "Z001" || payterm === "Z14" || payterm === "ZAP")) {
					objVar.zmsg = "Payment Term is not supported for " + ZcustomerType + " Customer Type";
					sap.m.MessageBox.confirm(
						objVar.zmsg, {
							icon: MessageBox.Icon.INFORMATION,
							title: "Payment Term not allowed",
							actions: [sap.m.MessageBox.Action.OK,
								sap.m.MessageBox.Action.CANCEL
							],
							emphasizedAction: MessageBox.Action.YES,
							onClose: function (sAction) {

							}

						});
				} else {
					if (objVar.AllowChanges) {
						this.getView().getModel("localModel").setProperty("/idSaveCredit", true);
					}
				}
			} else {

				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.Error);
				this.getView().getModel("localModel").setProperty("/idSaveCredit", false);
				this._wizard.invalidateStep(this.byId("idCredit"));

			}

		},
		wizardCompletedHandler: function () {

			var that = this;

			var oModel = that.getOwnerComponent().getModel();
			var RequestId = this.getView().byId("idRequestId").getText();
			//Comments Check
			if (objVar.Comments.ReqComments !== "") {

				this.getView().byId("idReqComments").setValueState(sap.ui.core.ValueState.None);
			}
			if (objVar.Comments.CmComments !== "") {

				this.getView().byId("idCmComments").setValueState(sap.ui.core.ValueState.None);
			}
			if (objVar.Comments.CcComments !== "") {

				this.getView().byId("idCcComments").setValueState(sap.ui.core.ValueState.None);
			}
			if (RequestId !== "") {
				if (objVar.WorkflowCycle === true) {
					var signature = {
						RequestId: RequestId
					};
					oModel.create("/SignatureSet",
						signature, {

							success: function (data) {
								MessageToast.show("Successfuly Digitally Signed.", {
									duration: 9000, // default
									width: "30em", // default
									my: "center center", // default
									at: "center center", // default
									of: window, // default
									offset: "0 0", // default
									collision: "fit fit", // default
									onClose: null, // default
									autoClose: true, // default
									animationTimingFunction: "ease", // default
									animationDuration: 1000, // default
									closeOnBrowserNavigation: true // default
								});

							},
							error: function (oError) {
								//	
								MessageToast.show("Error while Singing request. Please Try again.", {
									duration: 9000, // default
									width: "30em", // default
									my: "center center", // default
									at: "center center", // default
									of: window, // default
									offset: "0 0", // default
									collision: "fit fit", // default
									onClose: null, // default
									autoClose: true, // default
									animationTimingFunction: "ease", // default
									animationDuration: 1000, // default
									closeOnBrowserNavigation: true // default
								});

							}
						});

				} else {
					var submit = {
						RequestId: RequestId,
						Status: ""

					};

					//perform posting to sap start
					oModel.create("/SubmitSet",
						submit, {

							success: function (data) {
								//	
								if (data.Status === 'E') {
									sap.m.MessageBox.alert(
										"Error submitting request. Try again !", {
											onClose: function (oAction) {
												//	window.print();

											}
										});

								} else {
									//if the temp customer is created
									RequestId = data.RequestId;

									objVar.zmsg = "Submitted Requst with ID" + RequestId + " for approval. Thank you !";
									MessageToast.show(objVar.zmsg, {
										duration: 2500, // default
										width: "30em", // default
										my: "center center", // default
										at: "center center", // default
										of: window, // default
										offset: "0 0", // default
										collision: "fit fit", // default
										onClose: null, // default
										autoClose: true, // default
										animationTimingFunction: "ease", // default
										animationDuration: 1000, // default
										closeOnBrowserNavigation: true // default
									});

									that.getView().byId("CreateCreditWizard").setVisible(false);
									that.getView().getModel("localModel").setProperty("/idButtonUpload", false);
									that.getView().getModel("localModel").setProperty("/idSaveTable", false);

									location.reload();
								}
							},

							error: function (oError) {
								//	
								MessageToast.show("Error while submitting request. Please Try again.", {
									duration: 9000, // default
									width: "30em", // default
									my: "center center", // default
									at: "center center", // default
									of: window, // default
									offset: "0 0", // default
									collision: "fit fit", // default
									onClose: null, // default
									autoClose: true, // default
									animationTimingFunction: "ease", // default
									animationDuration: 1000, // default
									closeOnBrowserNavigation: true // default
								});

							}
						});
				}

			} else {
				objVar.zmsg = "Customer Request ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}

		},
		creditScreenValidation: function () {
			var error = false;
			var limit_max = parseFloat(customerData.Zcreditlimit) + 500000.000;
			var creditlimit = this.getView().byId("idCreditLimit").getValue().replaceAll(',', '');
			if (isNaN(creditlimit)) {
				objVar.zmsg = "Please enter correct credit limit!";
				this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
				error = true;
				sap.m.MessageToast.show(objVar.zmsg);
			} else if (parseFloat(creditlimit) > limit_max) {
				objVar.zmsg = "Please enter Credit Limit < " + limit_max + "!";
				this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
				error = true;
				sap.m.MessageToast.show(objVar.zmsg);
			}

			var email = this.getView().byId("idEmailId2").getValue();
			var mobile = this.getView().byId("idMobile2").getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

			if (!mailregex.test(email)) {
				objVar.zmsg = "Email ID is Invalid!";
				sap.m.MessageToast.show(objVar.zmsg);

				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;
			}
			if (isNaN(mobile) || mobile.length < 9 || mobile.length === 11 || mobile.length > 12) {
				objVar.zmsg = "Mobile ID is Invalid!";
				sap.m.MessageToast.show(objVar.zmsg);

				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;
			} else if (!(mobile.substring(0, 2) === '05' || mobile.substring(0, 4) === '9665' || mobile.substring(0, 1) === '5' || mobile.substring(
					0, 1) === '1' || mobile.substring(0, 2) === '01' || mobile.substring(0, 4) === '9661')) {
				objVar.zmsg = "Mobile ID is Invalid!";
				sap.m.MessageToast.show(objVar.zmsg);

				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;
			}
			var custtype = this.getView().byId("idCustType").getSelectedKey();

			if (validate.customerType && custtype === "") {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;

			} else {
				this.getView().byId("idCustType").setValueState(sap.ui.core.ValueState.None);

				//	this._wizard.validateStep(this.byId("idCustomerDet"));
			}

			var priceType = this.getView().byId("idPriceType").getSelectedKey();
			if (validate.priceType && priceType === "") {
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCredit"));
				error = true;

			} else {
				this.getView().byId("idPriceType").setValueState(sap.ui.core.ValueState.None);
				//	this._wizard.validateStep(this.byId("idCustomerDet"));

			}

			if (validate.newCreditLimit && (custtype === "2" || custtype === "3")) {

				if (creditlimit === "0.000") {
					this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
					this._wizard.invalidateStep(this.byId("idCredit"));
					error = true;
				} else {
					this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.None);
					//	this._wizard.validateStep(this.byId("idCustomerDet"));

				}

				var payterm = this.getView().byId("idPayTerms").getValue();
				if (validate.paymentTerm && payterm === "") {
					this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.Error);
					this._wizard.invalidateStep(this.byId("idCredit"));
					error = true;
				} else {
					this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);
					//	this._wizard.validateStep(this.byId("idCustomerDet"));

				}
			} else {
				this.getView().byId("idPayTerms").setValueState(sap.ui.core.ValueState.None);
			}
			if (validate.customerType && (parseFloat(creditlimit) > 5000) && (custtype === "3")) {
				this.getView().byId("idCreditLimit").setValue('0.000');
				objVar.zmsg = "TC credit limit cannot be more than 5000.00 SAR";
				MessageToast.show(objVar.zmsg);
				this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
				// sap.m.MessageBox.alert(
				// 	objVar.zmsg, {
				// 		onClose: function (oAction) {
				// 			//	window.print();

				// 		}
				// 	});
				error = true;
			} else if (validate.customerType && custtype === "2" && parseFloat(customerData.Zcreditlimit) > creditlimit) {
				objVar.zmsg = "For Already Credit Customer, not allowed to decrease the Credit Limit";
				MessageToast.show(objVar.zmsg);
				this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
				// sap.m.MessageBox.alert(
				// 	objVar.zmsg, {
				// 		onClose: function (oAction) {
				// 			//	window.print();

				// 		}
				// 	});

				error = true;
			}
			//idfileUploaderPromissory
			/*if ((creditlimit >= 20000) && (custtype === "2") && (this.getView().byId("idChannel").getValue() !== "10")) {
				this.getView().byId("idfileUploaderPromissory").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idAttach"));
			} else if ((creditlimit < 20000) && (custtype === "2") && (this.getView().byId("idChannel").getValue() !== "10")) {
				this.getView().byId("idfileUploaderPromissory").setValueState(sap.ui.core.ValueState.None);
				this._wizard.validateStep(this.byId("idAttach"));
			}*/
			if (error === true) {
				this.getView().byId("idSaveCredit").setEnabled(false);
			} else if (objVar.AllowChanges) {
				this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("idSaveCredit").setEnabled(true);
			}
		},
		handleWizardCancel: function () {
			location.reload();
		},
		onSaveTable: function (oEvent) {

			objVar.CustomerId = this.getView().byId("idCustID").getValue();
			objVar.RequestId = this.getView().byId("idRequestId").getText();
			if (objVar.RequestId != "") {
				var oTable = this.getView().byId("idTable1");
				var table = this.getView().byId("idTable1").getItems();
				var i;
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var idx;
				var Matnr;
				var ZspecialPrice;
				var ZfreeMonthly = 0;
				var ZbudgetPrice = 0;
				var tableLength = table.length;
				var z = 0;
				//looping will start here
				for (i = 0; i < table.length; i++) {
					idx = i;
					Matnr = table[i].mAggregations.cells[0].mProperties.text;
					ZspecialPrice = table[i].mAggregations.cells[3].mProperties.value;
					// ZfreeMonthly = table[i].mAggregations.cells[4].mProperties.value;
					//ZbudgetPrice = table[i].mAggregations.cells[5].mProperties.value;
					ZbudgetPrice = '0.00';
					ZfreeMonthly = '0.00';
					// if( (ZspecialPrice === "" || ZspecialPrice === "0.00") && (ZfreeMonthly=== "" || ZfreeMonthly === "0.00") ){
					// 	continue;
					// }
					var itemEntry = {
						Matnr: Matnr,
						RequestId: objVar.RequestId,
						ZspecialPrice: ZspecialPrice,
						ZfreeMonthly: ZfreeMonthly,
						ZbudgetPrice: ZbudgetPrice
					};

					oModel.create("/itemsSet",
						itemEntry, {

							success: function (data) {

								z = z + 1;
								if (table.length === z) {
									objVar.zmsg = "Updated Successfully";
									sap.m.MessageBox.success(
										objVar.zmsg, {
											onClose: function (oAction) {
												//	window.print();

											}
										});
								}
							},
							error: function (oError) {

								MessageToast.show("Error while submitting request. Please Try again.", {
									duration: 9000, // default
									width: "30em", // default
									my: "center center", // default
									at: "center center", // default
									of: window, // default
									offset: "0 0", // default
									collision: "fit fit", // default
									onClose: null, // default
									autoClose: true, // default
									animationTimingFunction: "ease", // default
									animationDuration: 1000, // default
									closeOnBrowserNavigation: true // default
								});
							}

						});

				} //table end
			} else {

				MessageToast.show("Customer Request ID not created. Please Try again.", {
					duration: 9000, // default
					width: "30em", // default
					my: "center center", // default
					at: "center center", // default
					of: window, // default
					offset: "0 0", // default
					collision: "fit fit", // default
					onClose: null, // default
					autoClose: true, // default
					animationTimingFunction: "ease", // default
					animationDuration: 1000, // default
					closeOnBrowserNavigation: true // default
				});
			}
		},
		openVATFile: function (oEvent) {

			var Zftype = 'VAT';

			var requestId = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + requestId + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open agnecy file
		openAgencyFile: function (oEvent) {

			var Zftype = 'AGENCY';

			objVar.RequestId = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestId + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open bank statement file
		openBankStmtFile: function (oEvent) {

			var Zftype = 'BANKSTMT';

			objVar.RequestId = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestId + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open shop license  file
		openLicenseFile: function (oEvent) {

			var Zftype = 'SHOPLICENSE';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open customer ID  file
		openIDFile: function (oEvent) {

			var Zftype = 'ID';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open customer CR  file
		openCRFile: function (oEvent) {

			var Zftype = 'CR';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open customer promoissory  file
		openPromissoryFile: function (oEvent) {

			var Zftype = 'PROMISSORY';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open bank letter  file
		openBankLetterFile: function (oEvent) {

			var Zftype = 'GUARANTEE';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open credit account  file
		openCreditAccountFile: function (oEvent) {

			var Zftype = 'CREDITACC';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		openAgingReport: function (oEvent) {

			var Zftype = 'AGING';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						// fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		openSEMAReport: function (oEvent) {

			var Zftype = 'SEMA';

			objVar.RequestID = this.getView().byId("idRequestId").getText();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/AttachmentsSet(RequestId=" + "'" + objVar.RequestID + "'" + ",Ztype=" + "'" + Zftype + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						// fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zsdcreditlimit.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" &&
							fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		handleFile: function (oEvent) {
			//var oFileUploader  = this.getView().byId("idfileUploaderVAT");
			//var oFileSize =  oFileUploader.getSize();
			sap.m.MessageToast.show("File Size exceeds 2 MB Size, Please uploade below 2MB File");
		},
		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		},
		onSaveComments: function (oEvent) {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			if (!objVar.Comments) {
				objVar.Comments = {};
			}
			objVar.Comments.RequestId = this.getView().byId("idRequestId").getText();
			objVar.Comments.CmComments = this.getView().byId("idCmComments").getValue();
			objVar.Comments.CcComments = this.getView().byId("idCcComments").getValue();
			objVar.Comments.VpsComments = this.getView().byId("idVpsComments").getValue();
			objVar.Comments.VpfComments = this.getView().byId("idVpfComments").getValue();
			objVar.Comments.CeoComments = this.getView().byId("idCeoComments").getValue();
			objVar.Comments.ReqComments = this.getView().byId("idReqComments").getValue();
			if (this.getView().byId("idReqComments").getValueState() === sap.ui.core.ValueState.Error && objVar.Comments.ReqComments === "") {
				this.getView().byId("idReqComments").setValue
				return;
			} else {
				this.getView().byId("idReqComments").setValueState(sap.ui.core.ValueState.None);
			}
			if (this.getView().byId("idCmComments").getValueState() === sap.ui.core.ValueState.Error && objVar.Comments.CmComments === "") {
				// this.getView().byId("idCmComments").setValueState(sap.ui.core.ValueState.Error);
				return;
			} else {
				this.getView().byId("idCmComments").setValueState(sap.ui.core.ValueState.None);
			}
			if (this.getView().byId("idCcComments").getValueState() === sap.ui.core.ValueState.Error && objVar.Comments.CcComments === "") {
				// this.getView().byId("idCcComments").setValueState(sap.ui.core.ValueState.Error);
				return;
			} else {
				this.getView().byId("idCcComments").setValueState(sap.ui.core.ValueState.None);
			}
			oModel.create("/CommentsSet",
				objVar.Comments, {
					success: function (data) {

						objVar.zmsg = "Comment Saves Successfully";
						MessageToast.show(objVar.zmsg, {
							duration: 1000, // default
							width: "30em", // default
							my: "center center", // default
							at: "center center", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});

					},
					error: function (oError) {
						MessageToast.show("Error while submitting request. Please Try again.", {
							duration: 9000, // default
							width: "30em", // default
							my: "center center", // default
							at: "center center", // default
							of: window, // default
							offset: "0 0", // default
							collision: "fit fit", // default
							onClose: null, // default
							autoClose: true, // default
							animationTimingFunction: "ease", // default
							animationDuration: 1000, // default
							closeOnBrowserNavigation: true // default
						});
					}
				});
		}
	});
});