<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Date"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Catalogo de Grupos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap2.css"></script>

<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>

<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorBeneficiarioRemoto.js"> </script>

<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="beneficiario.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js"></script>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">

<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
<form name="forma" method="get" action="" onSubmit=" return false" >


<div id="tabuladores">
	 <div class="panel with-nav-tabs panel-primary">
	 	 <div class="panel-heading">
	 	 	<ul class="nav nav-tabs responsive" id="tabsBeneficiariosPane" name="tabsBeneficiariosPane">
                <li class="active"><a href="#fragment-general" data-toggle="tab">Información general</a></li>
                <li><a href="#fragment-representante" data-toggle="tab">Datos para contacto</a></li>
                <li><a href="#fragment-fiscal" data-toggle="tab">Domicilio fiscal</a></li>
                <li><a href="#fragment-bancario" data-toggle="tab">Datos bancarios</a></li>
                <li><a href="#fragment-giro" data-toggle="tab">Dato Giro</a></li>
             </ul>
	 	 </div>
	 	 
	 	    <div class="panel-body">
	 	     	<div class="tab-content">
	 	     		 <!--Tab Información general-->
              		<div class="tab-pane fade in active" id="fragment-general">
              		 	<form class="form-horizontal">
              		 		 <!-- Mensaje -->
                    		 <div class="row">
                    		 	<div class="control-label col-sm-10"> Nota: (*) Requerido para nuevo beneficiario, (**) Requerido para nuevos funcionarios</div>
                    		 </div>
                    		 <br>
                    		<!-- Tipo de Beneficiario -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">**Tipo :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="tipo" class="form-control" id="tipo" style="width:150px" >
								        <option value="0" <c:if test="${beneficiario.TIPOBENEFI==''}">selected</c:if>>[Seleccione]</option>
								        <option value="PF" <c:if test="${beneficiario.TIPOBENEFI=='PF'||beneficiario.TIPOBENEFI=='PR'||beneficiario.TIPOBENEFI=='CO'||beneficiario.TIPOBENEFI=='CM'}">selected</c:if>>Persona Fisica</option>
								        <option value="PM" <c:if test="${beneficiario.TIPOBENEFI=='PM'}">selected</c:if>>Persona moral</option>
								        <option value="MP" <c:if test="${beneficiario.TIPOBENEFI=='MP'}">selected</c:if>>Funcionario</option>
							      	</select>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- RFC FISCAL -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*R. F. C. :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="rfc" type="text" class="form-control" id="rfc" value="<c:out value='${beneficiario.RFC}'/>"  maxlength="15" onBlur="upperCase(this)" style="width:150px" />
        							<input type="hidden" name="idProveedor" id="idProveedor" value="<c:out value='${id}'/>">
		                        </div>
		                      </div>
		                    </div>
		                     <!-- Beneficiario -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">**Raz&oacute;n Social:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="razonSocial" type="text" class="form-control" id="razonSocial" value="<c:out value='${beneficiario.NCOMERCIA}'/>" style="width:350px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Fecha alta -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha alta:</div>
		                        <div class="col-sm-3 form-group">
		                        	<div class="input-group date">
			                              <input name="fecha_altab" type="text" class="form-control" id="fecha_altab" value="<c:out value='${beneficiario.FECHA_ALTA}'/>" style="width:100%" maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Fecha baja -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha baja:</div>
		                        <div class="col-sm-3 form-group">
		                        	<div class="input-group date">
			                              <input name="fecha_bajab" type="text" class="form-control" id="fecha_bajab" value="<c:out value='${beneficiario.FECHA_BAJA}'/>" style="width:100%" maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>
              		 	</form>
              		</div>
	 	     		<div class="tab-pane" id="fragment-representante">
	 	     			<form class="form-horizontal">
	 	     					                                   
	 	     				<!-- Correo electronico  -->
	 	     				<div>
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3 ">Correo electronico:</div>
			                        <div class="col-sm-3 form-group">
			                        	<input name="responsable2" type="text" class="form-control" id="responsable2" value="<c:out value='${beneficiario.BENEFICIA2}'/>" style="width:350px" maxlength="100" " />
			                        </div>
			                      </div>
			                    </div>
		                    </div>
		                    <!-- Telefonos  -->
	 	     				<div>
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3 ">Telefonos:</div>
			                        <div class="col-sm-3 form-group">
			                        	<input name="telefono" type="text" class="form-control" id="telefono" value="<c:out value='${beneficiario.TELEFONOS}'/>" style="width:350px" onkeypress=" return keyNumbero( event );" maxlength="100" onBlur="upperCase(this)" />
			                        </div>
			                      </div>
			                    </div>
		                    </div>
		                </form>
	 	     		</div>
		 	    	<div class="tab-pane" id="fragment-fiscal">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Calle y numero -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Calle y N&uacute;mero :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="calle" type="text" class="form-control" id="calle" value="<c:out value='${beneficiario.DOMIFISCAL}'/>" style="width:350px" maxlength="60" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Colonia -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Colonia :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="colonia" type="text" class="form-control" id="colonia" value="<c:out value='${beneficiario.COLONIA}'/>" style="width:350px" maxlength="40" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                     <!-- Estado -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Estado :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="estado" type="text" class="form-control" id="estado" value="<c:out value='${beneficiario.ESTADO}'/>" style="width:150px" maxlength="25" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Ciudad -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Ciudad :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="ciudad" type="text" class="form-control" id="ciudad" value="<c:out value='${beneficiario.CIUDAD}'/>" style="width:350px" maxlength="50" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Codigo Postal -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*C&oacute;d. Postal :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="cp" type="text" class="form-control" id="cp" value="<c:out value='${beneficiario.CODIGOPOST}'/>" style="width:150px" maxlength="5" onKeyPress=" return keyNumbero( event );" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
	 	     			</form>
		 	    	</div>
		 	    	<div class="tab-pane" id="fragment-bancario">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Banco -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Banco :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="cbobanco" class="form-control" id="cbobanco" style="width:350px" >
								        <option value="0">[Seleccione]</option> 
								        	<c:forEach items="${bancos}" var="item" varStatus="status">
								        <option value='<c:out value="${item.CLV_BNCSUC}"/>' <c:if test='${item.CLV_BNCSUC==beneficiario.CLV_BNCSUC}'> selected</c:if>><c:out value='${item.BANCO}'/> <c:out value='${item.PLAZA}'/> <c:out value='${item.SUCURSAL}'/></option>
								            </c:forEach>
								    </select>  
								    <input type="hidden" name="idBanco" id="idBanco" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Numero de Cuenta -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">No. de Cuenta :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="noCuenta" type="text" class="form-control" id="noCuenta" value="<c:out value='${beneficiario.NUM_CTA}'/>" style="width:150px" maxlength="20" onBlur="upperCase(this)" onkeypress=" return keyNumbero( event );" />						
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Clabe -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Clabe :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="clabeb" type="text" class="form-control" id="clabeb" value="<c:out value='${beneficiario.CLABE}'/>" style="width:150px" maxlength="18" onBlur="upperCase(this)" onkeypress=" return keyNumbero( event );" />						
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Clabe -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Tipo :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="tipoCuenta" class="form-control" id="tipoCuenta" style="width:150px">
								        <option value="" <c:if test="${beneficiario.TIPO_CTA==''}">selected</c:if>>[Selecccione]</option>
								        <option value="A" <c:if test="${beneficiario.TIPO_CTA=='A'}">selected</c:if>>Ahorro</option>
								        <option value="C" <c:if test="${beneficiario.TIPO_CTA=='C'}">selected</c:if>>Cheques</option>
								     </select>						
		                        </div>
		                      </div>
		                    </div>
	 	     			</form>
		 	    	</div><!-- Termina fragment bancario  -->
		 	    	<div class="tab-pane" id="fragment-giro">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Banco -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-1 ">Giro: </div>
		                        <div class="col-sm-11 form-group">
		                        	<select name="cbogiro" class="selectpicker form-control input-sm m-b custom-bootstrap-select-class" data-live-search="true" id="cbogiro" style="width:350px; white-space: nowrap;
  text-overflow: ellipsis;" >
								        <option value="0">[Seleccione]</option> 
								        	<c:forEach items="${giros}" var="item" varStatus="status">
								        	<option value='<c:out value="${item.id_giro}"/>' 
								        		<c:if test='${item.id_giro==id_giro}'> selected</c:if>>
								        		<c:out value="${item.descripcion}"/>		        		
								        	</option>
								            </c:forEach>
								         </select>  
								</div>
		                      </div>
		                    </div>
		                    		               
	 	     			</form>
		 	    	</div><!-- Termina fragment Giro  -->
	 	    	</div>
	 	    </div>
	 </div>
</div><!--Cierra Div tabuladores -->

<table width="100%%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="35" align="center"><input  name="cmdcerrar" type="button" class="botones" id="cmdcerrar"   value="Cerrar" style="width:150px" />
      <input  name="cmdguardar" type="button" class="botones" id="cmdguardar"   value="Guardar" style="width:150px" /></td>
  </tr>
</table>
</form>
</body>
</html>
