<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documentos de los Precompromisos y Compromisos</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>

<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/sweetalert2.min.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>


<script>

function mostrarOpcionPDF(cve_doc, tipo_doc){
	if(tipo_doc=='OP')
		mostrarOPOpciones(cve_doc);
	else if(tipo_doc=='O.S' || tipo_doc=='REQ' || tipo_doc=='O.T')
		getReporteREQ(cve_doc);
	else if(tipo_doc=='PED')
		getReportePED(cve_doc);
	else if(tipo_doc=='CON')
		getReporteCON(cve_doc);
	else if(tipo_doc=='VAL')
		getReporteVAL(cve_doc);
	else
		alert('Reporte no soportado desde este modulo.');
}

function mostrarOPOpciones(cve_op){
	swal({
		  title: 'Opciones de Reporte Orden de Pago',
		  html:
			  '<table class="table table-hover" width="405" >'+
				'  <tr class="info"> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+cve_op+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+cve_op+')">&nbsp;Reporte Normal Orden de Pago</td> '+
				'  </tr> '+
				
				'  <tr class="success"> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')">&nbsp;Listar Anexos de Orden de Pago</td> '+
				'	</tr> '+
				'</table>',
		   width: 750,
		   showCancelButton: false,
		   showCloseButton: true,
		   confirmButtonText: 'Cerrar'
		})

}

function getAnexosListaOP(cve_op){
	//_closeDelay();
	swal({
		  title: 'Listado de Anexos de OP: ' + cve_op, 
		  html:
			  '<iframe width="600" height="200" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+cve_op+'"></iframe>',
		  width: 600,
		  showCancelButton: false,
		  showCloseButton: true,
		  confirmButtonText: 'Cerrar'
	})
}

function getReporteOP(CVE_OP) {
	$('#cve_op').attr('value',CVE_OP);
	$('#frm').attr('action',"../reportes/formato_orden_pago.action");
	$('#frm').attr('target',"impresion");
	$('#frm').submit();
}

function getReporteREQ(claveReq)   {
	$('#claveRequisicion').attr('value',claveReq);
	$('#frm').attr('target',"impresion");
	$('#frm').attr('action',"../reportes/requisicion.action");
	$('#frm').submit();
}

function getReportePED(clavePed)
{
	$('#clavePedido').attr('value',clavePed);
	$('#frm').attr('target',"impresion_pedido");
	$('#frm').attr("action", "../reportes/rpt_pedido.action");
	$('#frm').submit();
}

function getReporteCON(clave) {
	$('#cve_contrato').attr('value',clave);
	$('#frm').attr('action',"../reportes/rpt_contrato.action");
	$('#frm').attr('target',"impresion");
	$('#frm').submit();
}

function getReporteVAL(clave)
{
	$('#cve_val').attr('value',clave);
	$('#frm').attr('action',"../reportes/formato_vale.action");
	$('#frm').attr('target',"impresion");
	$('#frm').submit();
}


</script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-bottom: 0px;
	color:#000;
	font-size:11px;
}
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
-->
</style>
</head>

<body>  
<table class="listas" border="0"  style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="95%">
  <tr bgcolor="#889FC9">
    <th height="21" align="center">Num. Documento</th>
    <th width="12%" height="21" align="center">Tipo Doc.</th>
    <th height="21" align="center">Fecha doc.</th>
    <th align="center">Periodo</th>
    <th height="21" align="center">Programa / Partida</th>
    <th align="center">Monto</th>
  </tr>
  <c:set var="cont" value="${0}" />
  <c:set var="total" value="${0}" />
  <c:forEach items="${documentos}" var="item" varStatus="status" >
       <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
        <tr>
          <td width="19%" height="20" align="left"><a href="javascript:mostrarOpcionPDF(${item.CVE_DOC}, '${item.TIPO_DOC}')"><c:out value='${item.NUM_DOC}'/></a></td>
        <td height="16%" align="center"><c:out value='${item.TIPO_DOC}'/></td>
        <td width="17%" height="16%" align="center"><fmt:formatDate pattern="dd/MM/yyyy" value="${item.FECHA}" /></td>
        <td width="10%" height="16%" align="center"><c:out value='${item.PERIODO_S}'/></td>
        <td width="21%" height="16%" align="center"><c:out value='${item.N_PROGRAMA}'/> / <c:out value='${item.CLV_PARTID}'/></td>
        <td width="21%" height="16%" align="right">$<fmt:formatNumber value='${item.MONTO}' pattern="###,###,###.00"/>&nbsp;</td>
        </tr>
       <c:set var="cont" value="${cont+1}" /> 
      <c:set var="total" value="${total+item.MONTO}" /> 
  </c:forEach> 
        <tr>
          <td  bgcolor="#E9E9E9" height="20" colspan="6" align="right"><strong>$<fmt:formatNumber value='${total}' pattern="###,###,###.00"/></strong>&nbsp;</td>
        </tr>
</table>
<form  action="" method="post" id="frm" name="frm">
<input type="hidden" name="cve_op" id="cve_op">
<input type="hidden" name="claveRequisicion" id="claveRequisicion">
<input type="hidden" name="clavePedido" id="clavePedido">
<input type="hidden" name="cve_contrato" id="cve_contrato">
<input type="hidden" name="cve_val" id="cve_val">

</form>
</body>
</html>