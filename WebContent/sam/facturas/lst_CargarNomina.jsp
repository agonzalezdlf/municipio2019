<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
<title>Listado de Nomina</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>

<!-- <script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js"></script> 
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">

<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />	
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
-->
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>
<script type="text/javascript" src="../../dwr/util.js"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorCargarNominaDeductivasRemoto.js"> </script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
<script src="../../include/css/jquery.tiptip.js"></script>
<script type="text/javascript" src="lst_CargarNomina.js"> </script>
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

<style type="text/css">
	.cargando {
		width: 100%;height: 100%;
		overflow: hidden; 
		top: 0px;
		left: 0px;
		z-index: 10000;
		text-align: center;
		position:absolute; 
		background-color: #FFFFFF;
		opacity:0.6;
		filter:alpha(opacity=40);
	}

	#WindowLoad
	{
	    position:fixed;
	    top:0px;
	    left:0px;
	    z-index:3200;
	    filter:alpha(opacity=65);
	   -moz-opacity:65;
	    opacity:0.65;
	    background:#999;
	}
	a:link {
		text-decoration: none;
	}
	a:visited {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	a:active {
		text-decoration: none;
	}

</style></head>

<body class="Fondo" >
<form enctype="multipart/form-data"  method="post" id="frm" name="frm" action="demoAjax">
<h1 class="h1-encabezado">Nomina - Listado de Nómina</h1>
	 <div class="form-group col-sm-6">&nbsp;</div>
	  <div class="form-group col-sm-6">&nbsp;</div>
	  <div class="col-md-12">
	  	<div class="form-group">
	  		<div class="col-md-6">
	  			<div class="col-sm-4 col-md-offset-1 control-label">Archivo de Nomina y Deductivas:</div>
	  			<div class="col-md-2">
	  				<input type="file" class="input-file" id="fileNomina" name="fileNomina" style="width:445px" />
	  			</div>	
	  			
	  		</div>
	  		<div class="col-md-6">
	  			<input type="button" id="cmdupload" title='Subir el layout con la información de las nominas.' name="cmdupload" value="Cargar layout" class="btn btn-info btn-md">
	  			<input type="button" id="cmdload" title='Carga los datos para su validación presupuestal.' name="cmdload" value="Cargar datos" class="btn btn-success btn-md">
	  			<input type="button" id="cmdVaciar" title='Borra la información almacena.' name="cmdVaciar" value="Borrar datos" class="btn btn-warning btn-md">
	  			<input type="button" name="cmdexportar" id="cmdexportar" value="Exporar a excel" data-toggle="tooltip" title="Exportar a excel" class="btn btn-sucess" style="width:200px;">
	  			<input type="button" id="cmdCrearFacturaOP" title='Genera el momento del devengado y la Orden de Pago.' name="cmdCrearFacturaOP" value="Crear Facturas y Ordenes de Pago" class="btn btn-danger btn-outline">
	  		</div>
	  		
	  	</div>
	  </div>
	  <div class="form-group col-sm-6">&nbsp;</div>
	  <div class="col-md-12">
            <div class="panel with-nav-tabs panel-primary">
                <div class="panel-heading">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#fragment-nomina" data-toggle="tab">Nomina</a></li>
                            <li><a href="#fragment-deducciones" data-toggle="tab">Deducciones</a></li>
                            <li><a href="#fragment-validacion" data-toggle="tab">Validacion Nomina</a></li>
                        </ul>
                </div>
                <div class="panel-body">
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="fragment-nomina">
                        	<table width="95%" class="listasDetalles table table-hover" id="listaDocumentos">
							     <thead>
							      <tr>
							        <th width="6%" height="20">Cons.</th>
							        <th width="6%">ID_PROYECTO</th>
							        <th width="6%">CLV_PARTID</th>
							        <th width="8%">ID_RECURSO</th>
							        <th width="7%">CVE_PADRE</th>
							        <th width="8%">ID_DEPENDENCIA</th>
							        <th width="7%">TIPO_NOMINA</th>
							        <th width="8%">NUM_QUINCENA</th>
							        <th width="6%">MES</th>
							        <th width="9%">FECHA_NOMINA</th>
							        <th width="7%">IMPORTE</th>
							        <th width="22%">NOTA</th>
							      </tr>
							       </thead>   
							    <tbody>  
							    <c:set var="cont" value="${0}" /> 
							    <c:forEach items="${listadoNomina}" var="item" varStatus="status"> 
							      <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
							       <c:set var="cont" value="${cont+1}"/> 
							        <tr>
							        <td height="25" align="center">${cont}</td>
							        <td style='text-align: center;'>${item.ID_PROYECTO}</td>
							        <td style='text-align: center;'>${item.CLV_PARTID}</td>
							        <td style='text-align: center;'>${item.ID_RECURSO}</td>
							        <td style='text-align: center;'>${item.CLV_UNIADM}</td>
							        <td style='text-align: center;'>${item.ID_DEPENDENCIA}</td>
							        <td style='text-align: center;'>${item.TIPO_NOMINA}</td>
							        <td style='text-align: center;'>${item.NUM_QUINCENA}</td>
							        <td style='text-align: center;'>${item.MES}</td>
							        <td style='text-align: center;'>${item.FECHA_NOMINA}</td>
							        <td style='text-align: right;padding-right: 20px;'>$<fmt:formatNumber value="${item.IMPORTE}"  pattern="#,###,###,##0.00" />&nbsp;</td>
							        <td style='text-align: left;'>${item.NOTA}</td>
							      </tr>
							     
							      </c:forEach>
							       <tr>
							         <td colspan="12" style="background-color:#FFF"></tr>
							      </tbody>  
							    </table>
                        </div>
                        <div class="tab-pane fade" id="fragment-deducciones">
                        <table width="95%" border="0" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" align="center" id="listaDocumentos">
					     <thead>
					      <tr>
					        <th width="6%" height="20">Cons.</th>
					        <th style="text-align: center;width:10%">TIPO_NOMINA</th>
					        <th style="text-align: center;width:10%">ID_RECURSO</th>
					        <th style="text-align: center;width:10%">RECINTO</th>
					        <th style="text-align: center;width:10%"></th>
					        <th style="text-align: left;width:30%"><div align="left">RETENCIÒN</div></th>
					        <th style="text-align: right;width:12%;padding-right: 20px;">IMPORTE</th>
					       
					        </tr>
					       </thead>   
					    <tbody>  
					    <c:set var="cont" value="${0}" /> 
					    <c:forEach items="${listadodeducciones}" var="item" varStatus="status"> 
					      <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
					       <c:set var="cont" value="${cont+1}"/> 
					        <tr>
					        <td height="25" align="center">${cont}</td>
					        <td style='text-align: center;'>${item.TIPO_NOM}</td>
					        <td style='text-align: center;'>${item.ID_RECURSO}</td>
					        <td style='text-align: center;'>${item.RECINTO}</td>
					        <td style='text-align: center;'>${item.CLV_RETENC}</td>
					        <td style='text-align: left;'>${item.RETENCION}</td>
					        <td style='text-align: right; padding-right: 20px;'>$<fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" />&nbsp;</td>
					        </tr>
					     
					      </c:forEach>
					       <tr>
					         <td colspan="7" style="background-color:#FFF"></tr>
					      </tbody>  
					    </table>
                        </div>
                        <div class="tab-pane fade" id="fragment-validacion">
                        	<table width="95%" border="0" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" align="center" id="listaDocumentos">
						     <thead>
						      <tr>
						        <th width="8%" height="20">ID_PROYECTO</th>
						        <th width="8%">N_PROGRAMA</th>
						        <th width="8%" align="left">TIPO NOM.</th>
						        <th width="15%" align="left"><div align="left">&nbsp;DESCRIPCION PROGRAMA</div></th>
						        <th width="15%">DEPENDENCIA PADRE</th>
						        <th width="8%" align="left">CLV_PARTID</th>
						        <th width="15%" align="left"><div align="left">&nbsp;PARTIDA DESCRIPCION</div></th>
						        <th width="6%" align="left">TOTAL</th>
						        <th width="6%" align="left">DISP. MES</th>
						        <th width="6%">DISP.AÑO</th>
						        <th width="5%">SALDO MES</th>
						        </tr>
						       </thead>   
						    <tbody>  
						     <c:set var="cont" value="${0}" /> 
						    <c:set var="err" value="${0}" /> 
						    <c:forEach items="${listavalidacionNomina}" var="item" varStatus="status"> 
						        <c:set var="color" value="${'#fffcfc'}" /> 
						        <c:set var="cont" value="${cont+1}" /> 
						    	<c:if test="${(item.DISPONIBLE_MES-item.IMPORTE)<0}">
						        	<c:set var="err" value="${err+1}"/> 
						        	<c:set var="color" value="${'#ec9338'}" /> 
						            <input type="hidden" id="hd_error" value="${item.DISPONIBLE_MES-item.IMPORTE}">
						        </c:if>
						      <tr>
						        <tr>
						        <td style="background-color:${color}" align="center" height="20">${item.ID_PROYECTO}</td>
						        <td style="background-color:${color}" align="center">${item.N_PROGRAMA}</td>
						        <td align="center" style="background-color:${color}">${item.TIPO_NOMINA}</td>
						        <td align="left" style="background-color:${color}">${item.ACT_INST}</td>
						        <td style="background-color:${color}" align="center">${item.UNIDADADM}</td>
						        <td style="background-color:${color}" align="center">${item.CLV_PARTID}</td>
						        <td style="background-color:${color}" align="left">${item.PARTIDA}</td>
						        <td align="right" style="background-color:${color}">$<fmt:formatNumber value="${item.IMPORTE}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						        <td align="right" style="background-color:${color}">$<fmt:formatNumber value="${item.DISPONIBLE_MES}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						        <td style="background-color:${color}" align="right">$<fmt:formatNumber value="${item.DISPONIBLE_ANIO}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						        <td style="background-color:${color}" align="right">$<fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						        </tr>
						     
						      </c:forEach>
						       <tr>
						         <td colspan="12" style="background-color:#FFF">
						         <c:if test="${cont>0}">
						         	<input type="button" id="cmdCrearFacturaOP" title='Genera el momento del devengado y la Orden de Pago.' name="cmdCrearFacturaOP" value="Crear Facturas y Ordenes de Pago" class="btn btn-danger btn-outline">
						         </c:if>
						        </tr>
						      </tbody>  
						    </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<br />
</form>
<form name="frmExcel" id="frmExcel" action="lst_reporteexcelNomina.action" method="post">
	
	<div id="bloquea" class="cargando" style="display:none;">
	<img style="margin-left: 5%;margin-top: 15%" alt="Espere..." src="../imagenes/spinner_2.gif" />

</div>
</form>
</body>
</html>
